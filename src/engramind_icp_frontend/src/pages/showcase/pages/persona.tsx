"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "../ShowcaseLayout";
import { useCallback, useEffect, useState } from "react";
import { axiosElwyn, fetcherElwyn } from "../../../utils/api";
import { useFormik } from "formik";
import useSWR from "swr";
import { PersonaData, PersonaResponse } from "../../../interface/persona";
import {
  CreatePersonaForm,
  UpdatePersonaForm,
  SearchBar,
  AnimatedModal,
  Relic,
  ItemCard,
} from "../../../components/ui";
import {
  CreateFormValues,
  EditFormValues,
  createPersonaInitialValues,
  createPersonaSchema,
  updatePersonaInitialValues,
  updatePersonaSchema,
} from "../../../formik";
import {
  handleUpdateFormikBody,
  populateUpdateFormik,
} from "../../../utils/showcase";
import { _SERVICE } from "../../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../../utils/IC";
import { Principal } from "@dfinity/principal";
import { PersonaDetails } from "../../../components/ui/showcase/PersonaDetails";
import { toast } from "sonner";
import { FileResponse } from "../../../interface";
import { formatNickname, ItemType } from "../../../utils/helper";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function PersonaPage() {
  const principal = Cookies.get("principal");
  const userNickname = Cookies.get("nickname");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditPersona, setIsOpenEditPersona] = useState(false);
  const [isOpenPersonaDetails, setIsOpenPersonaDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [backend, setBackend] = useState<_SERVICE>();
  const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(
    null
  );
  const { nickname } = useSelector((state: any) => state.user);
  const [currentNickname, setCurrentNickname] = useState(
    nickname || userNickname
  );
  const { data: totalPersonaData, mutate: personaMutate } = useSWR(
    `/assessment/persona-characters`,
    fetcherElwyn
  );
  const totalPersonaResult: PersonaData[] = totalPersonaData?.data?.data
    ?.filter((persona: PersonaData) => persona.organization_id === principal)
    ?.sort((a: any, b: any) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateB - dateA;
    });

  const handleEditPersona = () => {
    if (selectedPersona) {
      populateUpdateFormik(updateFormik, selectedPersona);
    }
    setIsOpenPersonaDetails(false);
    setIsOpenEditPersona(true);
  };

  const updateFormik = useFormik<EditFormValues>({
    initialValues: updatePersonaInitialValues,
    validationSchema: updatePersonaSchema,
    onSubmit: async (values, { resetForm }) => {
      const toastId = toast.loading("Updating persona...", {
        id: "update-persona",
        duration: Infinity,
      });
      try {
        setLoading(true);
        await axiosElwyn.put(
          `/assessment/persona-characters/${values.id}`,
          handleUpdateFormikBody(values)
        );
        toast.success("Persona updated successfully!", {
          id: toastId,
          duration: 4000,
        });
        personaMutate();
        setLoading(false);
        setIsOpenEditPersona(false);
        resetForm();
      } catch (e) {
        toast.error(e?.toString(), {
          id: toastId,
          duration: 4000,
        });
        setLoading(false);
      }
    },
  });

  const createFormik = useFormik<CreateFormValues>({
    initialValues: createPersonaInitialValues,
    validationSchema: createPersonaSchema,
    onSubmit: async (values, { resetForm }) => {
      const toastId = toast.loading("Creating persona...", {
        id: "create-persona",
        duration: Infinity,
      });
      try {
        setLoading(true);
        const fileIdsTemp = values?.files?.map((x: FileResponse) => x.file_id);
        const response = await axiosElwyn.post(
          "/assessment/live/persona-characters/create",
          {
            name: values.name,
            persona_prompt: values.personaPrompt,
            organization_id: principal,
            file_ids: fileIdsTemp,
          }
        );
        const personaResponse = response.data as PersonaResponse;
        await backend?.addContentToUser(
          Principal.fromText(principal ?? ""),
          { Persona: null },
          personaResponse?.data?.id
        );
        personaMutate();
        populateUpdateFormik(updateFormik, personaResponse?.data);
        setLoading(false);
        setIsOpen(false);
        setIsOpenEditPersona(true);
        resetForm();
        toast.success("Persona created successfully!", {
          id: toastId,
          duration: 4000,
        });
      } catch (e) {
        toast.error(e?.toString(), {
          id: toastId,
          duration: 4000,
        });
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
    if (nickname) {
      setCurrentNickname(nickname);
    }
  }, [nickname]);

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {formatNickname(currentNickname)}
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
        <SearchBar title="Persona" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {totalPersonaResult?.map((item: PersonaData) => (
            <ItemCard
              key={item.id}
              itemType={ItemType.Persona}
              item={item}
              handleSelect={handleSelectedPersona}
            />
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
          className="h-[85vh] overflow-scroll"
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
            onEditPress={handleEditPersona}
            persona={selectedPersona}
          />
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
