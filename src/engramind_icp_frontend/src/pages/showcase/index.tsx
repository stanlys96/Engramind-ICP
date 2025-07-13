"use client";
import { useUser } from "../../context/UserContext";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "./ShowcaseLayout";
import { useState } from "react";
import { useToast } from "../../toast/toast";
import axios from "axios";
import { API_BASE_URL, API_KEY, API_REQUEST_FROM } from "../../utils/api";
import { useFormik } from "formik";
import { PersonaResponse } from "../../interface/persona";
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

export default function ShowcasePage() {
  const { name } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditPersona, setIsOpenEditPersona] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const updateFormik = useFormik<EditFormValues>({
    initialValues: updatePersonaInitialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        await axios.put(
          `${API_BASE_URL}/assessment/persona-characters/${values.id}`,
          handleUpdateFormikBody(values),
          {
            headers: {
              "X-AI_TOKEN": API_KEY,
              "X-REQUEST_FROM": API_REQUEST_FROM,
            },
          }
        );
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
        const response = await axios.post(
          `${API_BASE_URL}/assessment/live/persona-characters/create`,
          {
            name: values.name,
            persona_prompt: values.personaPrompt,
          },
          {
            headers: {
              "X-AI_TOKEN": API_KEY,
              "X-REQUEST_FROM": API_REQUEST_FROM,
            },
          }
        );
        addToast({ message: "Successfully created your persona!" });
        const personaResponse = response.data as PersonaResponse;
        populateUpdateFormik(updateFormik, personaResponse);
        setLoading(false);
        setIsOpen(false);
        setIsOpenEditPersona(true);
        resetForm();
      } catch (e) {
        setLoading(false);
      }
    },
  });

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {name}
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
            // to={"/showcase/create"}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer md:mb-0 mb-[20px]"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Persona</span>
          </a>
        </div>
        <SearchBar />
        <CategoryFilter />
        <Relic />
        <AnimatedModal
          isOpen={isOpen}
          onClose={() => {
            if (loading) return;
            setIsOpen(false);
          }}
        >
          <CreatePersonaForm
            loading={loading}
            createFormik={createFormik}
            setIsOpen={setIsOpen}
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
      </div>
    </ShowcaseLayout>
  );
}
