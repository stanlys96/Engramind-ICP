"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "./ShowcaseLayout";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../../toast/toast";
import { axiosElwyn, fetcherElwyn } from "../../utils/api";
import { useFormik } from "formik";
import useSWR from "swr";
import { PersonaData, PersonaResponse } from "../../interface/persona";
import {
  CreatePersonaForm,
  UpdatePersonaForm,
  CategoryFilter,
  SearchBar,
  AnimatedModal,
  Relic,
} from "../../components/ui";
import {
  CreateFormValues,
  EditFormValues,
  createPersonaInitialValues,
  updatePersonaInitialValues,
} from "../../formik";
import {
  handleUpdateFormikBody,
  populateUpdateFormik,
} from "../../utils/showcase";
import Cookies from "js-cookie";
import { _SERVICE } from "../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../utils/IC";
import { Principal } from "@dfinity/principal";
import { selectCommonIds } from "../../utils/helper";
import { PersonaDetails } from "../../components/ui/showcase/PersonaDetails";

export default function ShowcasePage() {
  const name = Cookies.get("principal");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditPersona, setIsOpenEditPersona] = useState(false);
  const [isOpenPersonaDetails, setIsOpenPersonaDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [backend, setBackend] = useState<_SERVICE>();
  const [currentPersonas, setCurrentPersonas] = useState<PersonaData[]>();
  const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(
    null
  );
  const { addToast } = useToast();
  const { data: totalPersonaData, mutate: personaMutate } = useSWR(
    `/assessment/persona-characters`,
    fetcherElwyn
  );
  const totalPersonaResult = totalPersonaData?.data?.data;
  const updateFormik = useFormik<EditFormValues>({
    initialValues: updatePersonaInitialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        await axiosElwyn.put(
          `/assessment/persona-characters/${values.id}`,
          handleUpdateFormikBody(values)
        );
        personaMutate();
        addToast({ message: "Successfully updated your persona!" });
        setLoading(false);
        setIsOpenEditPersona(false);
        resetForm();
      } catch (e) {
        setLoading(false);
      }
    },
  });

  const createFormik = useFormik<CreateFormValues>({
    initialValues: createPersonaInitialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const response = await axiosElwyn.post(
          "/assessment/live/persona-characters/create",
          {
            name: values.name,
            persona_prompt: values.personaPrompt,
            organization_id: name,
          }
        );
        const personaResponse = response.data as PersonaResponse;
        await backend?.addContentToUser(
          Principal.fromText(name ?? ""),
          { Persona: null },
          personaResponse?.data?.id
        );
        personaMutate();
        addToast({ message: "Successfully created your persona!" });
        populateUpdateFormik(updateFormik, personaResponse?.data);
        setLoading(false);
        setIsOpen(false);
        setIsOpenEditPersona(true);
        resetForm();
      } catch (e) {
        setLoading(false);
      }
    },
  });

  const handleSelectedPersona = useCallback((persona: PersonaData) => {
    setIsOpen(false);
    setIsOpenPersonaDetails(true);
    setSelectedPersona(persona);
  }, []);

  useEffect(() => {
    IC.getBackend((result: _SERVICE) => {
      setBackend(result);
    });
  }, []);

  useEffect(() => {
    if (totalPersonaResult?.length > 0) {
      const theUserPersonas = totalPersonaResult
        ?.filter((persona: PersonaData) => persona.organization_id === name)
        .sort((a: any, b: any) => {
          const dateA = new Date(a.timestamp).getTime();
          const dateB = new Date(b.timestamp).getTime();
          return dateB - dateA;
        });
      setCurrentPersonas(theUserPersonas);
    }
  }, [totalPersonaResult]);

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {name?.slice(0, 12) + "..."}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Curated profiles. Proven expertise. Find and connect with your AI
              Mentor, at your own time.
            </p>
          </div>
          <a
            onClick={() => {
              setIsOpen(true);
            }}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer md:mb-0 mb-[20px]"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Persona</span>
          </a>
        </div>
        <SearchBar />
        <CategoryFilter />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentPersonas?.map((item: PersonaData) => (
            <div
              key={item.id}
              onClick={() => handleSelectedPersona(item)}
              className="dark:bg-zinc-800 bg-zinc-200 w-full h-full rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:opacity-60"
            >
              <img
                src={`https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                alt="character"
                className="w-full h-64 object-cover rounded-t-xl"
                width={400}
                height={300}
              />
              <div className="p-4  ">
                <>
                  <h3 className="text-base font-semibold dark:text-white text-zinc-800">
                    {item.name}
                  </h3>
                  <p className="bg-purple-500 mt-2 text-white text-xs font-medium px-2 py-1 rounded-full w-fit">
                    {item.timestamp?.slice(0, 10)}
                  </p>
                </>
              </div>
            </div>
          ))}
        </div>
        <Relic />
        <AnimatedModal
          isOpen={isOpen}
          onClose={() => {
            if (loading || uploading) return;
            setIsOpen(false);
          }}
        >
          <CreatePersonaForm
            loading={loading}
            createFormik={createFormik}
            setIsOpen={setIsOpen}
            uploading={uploading}
            setUploading={setUploading}
          />
        </AnimatedModal>
        <AnimatedModal
          isOpen={isOpenEditPersona}
          onClose={() => setIsOpenEditPersona(false)}
        >
          <UpdatePersonaForm
            loading={loading}
            updateFormik={updateFormik}
            setIsOpen={setIsOpenEditPersona}
          />
        </AnimatedModal>
        <AnimatedModal
          className="h-[85vh] overflow-scroll"
          isOpen={isOpenPersonaDetails}
          onClose={() => setIsOpenPersonaDetails(false)}
        >
          <PersonaDetails
            onEditPress={() => {
              if (selectedPersona) {
                populateUpdateFormik(updateFormik, selectedPersona);
              }
              setIsOpenPersonaDetails(false);
              setIsOpenEditPersona(true);
            }}
            persona={selectedPersona}
          />
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
