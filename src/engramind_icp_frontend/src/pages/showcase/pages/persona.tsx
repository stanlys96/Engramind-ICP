"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "../ShowcaseLayout";
import { useCallback, useEffect, useState } from "react";
import { axiosBackend, fetcherBackend } from "../../../utils/api";
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
import { FileResponse, JobResponse } from "../../../interface";
import { formatNickname, ItemType, JobStatus } from "../../../utils/helper";
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
    `persona/all/${principal}`,
    fetcherBackend
  );
  const totalPersonaResult: PersonaData[] = totalPersonaData?.data;

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
      try {
        setLoading(true);
        const response = await axiosBackend.post("/persona/update", values);
        const jobResponse = response.data as JobResponse;
        const updatePersonaInterval = setInterval(async () => {
          const personaStatus = await axiosBackend.get(
            `/persona/job-status-update/${jobResponse.jobId}`
          );
          const personaResult = personaStatus.data as PersonaResponse;
          if (personaResult.jobStatus === JobStatus.Completed) {
            toast.success("Persona updated successfully!", {
              duration: 4000,
            });
            personaMutate();
            setLoading(false);
            setIsOpen(false);
            resetForm();
            clearInterval(updatePersonaInterval);
          } else if (personaResult.jobStatus === JobStatus.Failed) {
            setLoading(false);
            toast.error("Persona failed to be updated. Please try again.", {
              duration: 4000,
            });
            clearInterval(updatePersonaInterval);
          }
        }, 5000);
      } catch (e) {
        toast.error(e?.toString(), {
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
      try {
        setLoading(true);
        const fileIdsTemp = values?.files?.map((x: FileResponse) => x.file_id);
        const response = await axiosBackend.post("/persona/create", {
          name: values.name,
          persona_prompt: values.personaPrompt,
          organization_id: principal,
          file_ids: fileIdsTemp,
        });
        const jobResponse = response.data as JobResponse;
        const createPersonaInterval = setInterval(async () => {
          const personaStatus = await axiosBackend.get(
            `/persona/job-status-create/${jobResponse.jobId}`
          );
          const personaResult = personaStatus.data as PersonaResponse;
          if (personaResult.jobStatus === JobStatus.Completed) {
            await backend?.addContentToUser(
              Principal.fromText(principal ?? ""),
              { Persona: null },
              personaResult?.result?.data?.id
            );
            toast.success("Persona created successfully!", {
              id: "persona-success",
              duration: 4000,
            });
            personaMutate();
            populateUpdateFormik(updateFormik, personaResult?.result?.data);
            setLoading(false);
            setIsOpen(false);
            setIsOpenEditPersona(true);
            resetForm();
            clearInterval(createPersonaInterval);
          } else if (personaResult.jobStatus === JobStatus.Failed) {
            setLoading(false);
            toast.error("Persona failed to be created. Please try again.", {
              id: "persona-error",
              duration: 4000,
            });
            clearInterval(createPersonaInterval);
          }
        }, 5000);
      } catch (e) {
        toast.error(e?.toString(), {
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
