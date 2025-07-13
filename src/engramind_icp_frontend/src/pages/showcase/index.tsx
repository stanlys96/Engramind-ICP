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
          {
            name: values.name,
            persona_details: {
              name: values.name,
              age: values.age,
              gender: values.gender,
              occupation: values.occupation,
              language: values.language,
              hometown: values.hometown,
              birthdate: values.birthdate,
              nationality: values.nationality,
              background: values.background,
              scenarioSnippet: values.scenarioSnippet,
              personalityTraits: {
                mbtiType: values.mbtiType,
                enneagramType: values.enneagramType,
                bigFive: {
                  openness: values.openness,
                  conscientiousness: values.conscientiousness,
                  extraversion: values.extraversion,
                  agreeableness: values.agreeableness,
                  neuroticism: values.neuroticism,
                },
              },
              physicalDescription: {
                build: values.build,
                height: values.height,
                eyeColor: values.eyeColor,
                skinTone: values.skinTone,
                hairColor: values.hairColor,
                hairStyle: values.hairStyle,
                typicalAttire: values.typicalAttire,
                distinguishingFeatures: values.distinguishingFeatures,
              },
              skillsAndAbilities: values.skillsAndAbilities,
              motivationsAndGoals: values.motivationsAndGoals,
              industryRelevance: values.industryRelevance,
              relevanceToScenario: values.relevanceToScenario,
              challengesAndGrowthAreas: values.challengesAndGrowthAreas,
            },
          },
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
        updateFormik.setFieldValue("id", personaResponse?.data?.id);
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
