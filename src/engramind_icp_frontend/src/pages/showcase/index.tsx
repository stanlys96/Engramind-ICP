"use client";
import { CategoryFilter } from "../../components/ui/showcase/CategoryFilter";
import Relic from "../../components/ui/showcase/Relic";
import { SearchBar } from "../../components/ui/showcase/SearchBar";
import { useUser } from "../../context/UserContext";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "./ShowcaseLayout";
import { AnimatedModal } from "../../components/ui/AnimatedModal";
import { useState } from "react";
import { AnimatedDropdown } from "../../components/ui/AnimatedDropdown";
import { useToast } from "../../toast/toast";
import { AnimatedSpinner } from "../../components/ui/AnimatedSpinner";
import axios from "axios";
import { API_BASE_URL, API_KEY, API_REQUEST_FROM } from "../../utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateFormValues, EditFormValues } from "../../formik/interface";
import { PersonaResponse } from "../../interface/persona";
import { CreatePersonaForm } from "../../components/ui/showcase/CreatePersonaForm";
import { UpdatePersonaForm } from "../../components/ui/showcase/UpdatePersonaForm";
import {
  createPersonaInitialValues,
  updatePersonaInitialValues,
} from "../../formik/persona";

export default function ShowcasePage() {
  const { name } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditPersona, setIsOpenEditPersona] = useState(false);
  const updateFormik = useFormik<EditFormValues>({
    initialValues: updatePersonaInitialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${API_BASE_URL}/assessment/live/persona-characters/create`,
          {
            name: "",
            persona_prompt: personaPrompt,
          },
          {
            headers: {
              "X-AI_TOKEN": API_KEY,
              "X-REQUEST_FROM": API_REQUEST_FROM,
            },
          }
        );
        addToast({ message: "Successfully created your persona!" });
        setLoading(false);
        setIsOpen(false);
        setIsOpenEditPersona(true);
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
        updateFormik.setFieldValue("name", personaResponse?.data?.name);
        updateFormik.setFieldValue(
          "age",
          personaResponse?.data?.persona_details?.age
        );
        updateFormik.setFieldValue(
          "gender",
          personaResponse?.data?.persona_details?.gender
        );
        updateFormik.setFieldValue(
          "occupation",
          personaResponse?.data?.persona_details?.occupation
        );
        updateFormik.setFieldValue(
          "language",
          personaResponse?.data?.persona_details?.language
        );
        updateFormik.setFieldValue(
          "hometown",
          personaResponse?.data?.persona_details?.hometown
        );
        updateFormik.setFieldValue(
          "birthdate",
          personaResponse?.data?.persona_details?.birthdate
        );
        updateFormik.setFieldValue(
          "nationality",
          personaResponse?.data?.persona_details?.nationality
        );
        updateFormik.setFieldValue(
          "background",
          personaResponse?.data?.persona_details?.background
        );
        updateFormik.setFieldValue(
          "scenarioSnippet",
          personaResponse?.data?.persona_details?.scenarioSnippet
        );
        updateFormik.setFieldValue(
          "mbtiType",
          personaResponse?.data?.persona_details?.personalityTraits?.mbtiType
        );
        updateFormik.setFieldValue(
          "enneagramType",
          personaResponse?.data?.persona_details?.personalityTraits
            ?.enneagramType
        );
        updateFormik.setFieldValue(
          "openness",
          personaResponse?.data?.persona_details?.personalityTraits?.bigFive
            ?.openness
        );
        updateFormik.setFieldValue(
          "conscientiousness",
          personaResponse?.data?.persona_details?.personalityTraits?.bigFive
            ?.conscientiousness
        );
        updateFormik.setFieldValue(
          "extraversion",
          personaResponse?.data?.persona_details?.personalityTraits?.bigFive
            ?.extraversion
        );
        updateFormik.setFieldValue(
          "agreeableness",
          personaResponse?.data?.persona_details?.personalityTraits?.bigFive
            ?.agreeableness
        );
        updateFormik.setFieldValue(
          "neuroticism",
          personaResponse?.data?.persona_details?.personalityTraits?.bigFive
            ?.neuroticism
        );
        updateFormik.setFieldValue(
          "skillsAndAbilities",
          personaResponse?.data?.persona_details?.skillsAndAbilities
        );
        updateFormik.setFieldValue(
          "motivationsAndGoals",
          personaResponse?.data?.persona_details?.motivationsAndGoals
        );
        updateFormik.setFieldValue(
          "build",
          personaResponse?.data?.persona_details?.physicalDescription?.build
        );
        updateFormik.setFieldValue(
          "height",
          personaResponse?.data?.persona_details?.physicalDescription?.height
        );
        updateFormik.setFieldValue(
          "eyeColor",
          personaResponse?.data?.persona_details?.physicalDescription?.eyeColor
        );
        updateFormik.setFieldValue(
          "skinTone",
          personaResponse?.data?.persona_details?.physicalDescription?.skinTone
        );
        updateFormik.setFieldValue(
          "hairColor",
          personaResponse?.data?.persona_details?.physicalDescription?.hairColor
        );
        updateFormik.setFieldValue(
          "hairStyle",
          personaResponse?.data?.persona_details?.physicalDescription?.hairStyle
        );
        updateFormik.setFieldValue(
          "typicalAttire",
          personaResponse?.data?.persona_details?.physicalDescription
            ?.typicalAttire
        );
        updateFormik.setFieldValue(
          "distinguishingFeatures",
          personaResponse?.data?.persona_details?.physicalDescription
            ?.distinguishingFeatures
        );
        updateFormik.setFieldValue(
          "industryRelevance",
          personaResponse?.data?.persona_details?.industryRelevance
        );
        updateFormik.setFieldValue(
          "relevanceToScenario",
          personaResponse?.data?.persona_details?.relevanceToScenario
        );
        updateFormik.setFieldValue(
          "challengesAndGrowthAreas",
          personaResponse?.data?.persona_details?.challengesAndGrowthAreas
        );
        setLoading(false);
        setIsOpen(false);
        setIsOpenEditPersona(true);
        resetForm();
      } catch (e) {
        setLoading(false);
      }
    },
  });
  const [personaPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

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
