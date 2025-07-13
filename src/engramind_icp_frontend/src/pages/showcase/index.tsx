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

export default function ShowcasePage() {
  const { name } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditPersona, setIsOpenEditPersona] = useState(false);
  const updateFormik = useFormik<EditFormValues>({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      occupation: "",
      language: "",
      hometown: "",
      birthdate: "",
      nationality: "",
      background: "",
      scenarioSnippet: "",
      mbtiType: "",
      enneagramType: "",
      openness: "",
      conscientiousness: "",
      extraversion: "",
      agreeableness: "",
      neuroticism: "",
      skillsAndAbilities: "",
      motivationsAndGoals: "",
      build: "",
      height: "",
      eyeColor: "",
      skinTone: "",
      hairColor: "",
      hairStyle: "",
      typicalAttire: "",
      distinguishingFeatures: "",
      industryRelevance: "",
      relevanceToScenario: "",
      challengesAndGrowthAreas: "",
    },
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
        console.log(response.data, "<<< DATA");
        setLoading(false);
        setIsOpen(false);
        setIsOpenEditPersona(true);
      } catch (e) {
        setLoading(false);
      }
    },
  });
  const createFormik = useFormik<CreateFormValues>({
    initialValues: {
      name: "",
      personaPrompt: "",
    },
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
          <form onSubmit={createFormik.handleSubmit}>
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
              ⚡ Create New Persona
            </h2>
            <div className="md:flex-row flex-col flex justify-between items-center mb-3">
              <label className="block mb-3 md:mb-1 flex flex-1 text-md text-gray-700 dark:text-white">
                Add Source File
              </label>
              <AnimatedDropdown
                loading={loading}
                label="Select file to add..."
                options={["Profile", "Settings", "Logout"]}
                onSelect={(e) => {}}
                customClassName="w-[100%] md:w-[80%]"
              />
            </div>
            <div className="md:flex-row flex-col flex gap-x-2 items-center justify-end md:mb-0 mb-3">
              <p className="italic text-[14px] text-[#627084] md:mb-0 mb-3">
                Do you not have the file you need?
              </p>
              <button
                onClick={() => {}}
                className={`bg-purple-600 text-white px-4 py-2 rounded-full cursor-pointer`}
              >
                Upload New File
              </button>
            </div>
            <label
              htmlFor="name"
              className="block mb-1 text-gray-700 text-md dark:text-white"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onBlur={createFormik.handleBlur}
              value={createFormik.values.name}
              onChange={createFormik.handleChange}
              placeholder="Enter persona name"
              className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                loading
                  ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                  : "dark:bg-zinc-800 bg-zinc-50"
              }`}
              disabled={loading}
            />
            <label
              htmlFor="personaPrompt"
              className="block mb-1 text-gray-700 text-md dark:text-white mt-[10px]"
            >
              Persona Prompt <span className="text-red-500">*</span>
            </label>
            <textarea
              id="personaPrompt"
              name="personaPrompt"
              value={createFormik.values.personaPrompt}
              onChange={createFormik.handleChange}
              onBlur={createFormik.handleBlur}
              placeholder="Make a personalized description of the persona"
              className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                loading
                  ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                  : "dark:bg-zinc-800 bg-zinc-50"
              }`}
              rows={4}
              disabled={loading}
            />
            <div className="flex justify-end mt-5 gap-x-3">
              <button
                disabled={loading}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 h-fit cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  !createFormik.values.name ||
                  !createFormik.values.personaPrompt ||
                  loading
                }
                className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
                  !createFormik.values.name ||
                  !createFormik.values.personaPrompt ||
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-700"
                }`}
              >
                <AnimatedSpinner show={loading} />
                {loading ? "Creating..." : "Create Persona"}
              </button>
            </div>
          </form>
        </AnimatedModal>
        <AnimatedModal
          isOpen={isOpenEditPersona}
          onClose={() => setIsOpenEditPersona(false)}
        >
          <form
            onSubmit={updateFormik.handleSubmit}
            className="h-[85vh] overflow-scroll"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
              Edit Persona: asdasd
            </h2>
            <div className="gap-y-3 flex flex-col">
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={updateFormik.values.name}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter persona name"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="age"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    value={updateFormik.values.age}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      updateFormik.setFieldValue("age", digitsOnly);
                    }}
                    onBlur={updateFormik.handleBlur}
                    type="text"
                    placeholder="Enter persona name"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="gender"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Gender
                  </label>
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    value={updateFormik.values.gender}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter persona name"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="occupation"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    id="occupation"
                    value={updateFormik.values.occupation}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter occupation"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="language"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Language
                  </label>
                  <input
                    type="text"
                    name="language"
                    id="language"
                    value={updateFormik.values.language}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter language"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="hometown"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Hometown
                  </label>
                  <input
                    type="text"
                    name="hometown"
                    id="hometown"
                    value={updateFormik.values.hometown}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter hometown"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="birthdate"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Birthdate
                  </label>
                  <input
                    type="text"
                    name="birthdate"
                    id="birthdate"
                    value={updateFormik.values.birthdate}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter birthdate"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="nationality"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    id="nationality"
                    value={updateFormik.values.nationality}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter nationality"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="background"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Background
                  </label>
                  <textarea
                    rows={6}
                    name="background"
                    id="background"
                    value={updateFormik.values.background}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter background"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="scenarioSnippet"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Scenario Snippet
                  </label>
                  <textarea
                    rows={4}
                    name="scenarioSnippet"
                    id="scenarioSnippet"
                    value={updateFormik.values.scenarioSnippet}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter scenario snippet"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                Personality traits
              </h2>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="mbtiType"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    MBTI Type
                  </label>
                  <input
                    type="text"
                    name="mbtiType"
                    id="mbtiType"
                    value={updateFormik.values.mbtiType}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter MBTI type"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="enneagramType"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Enneagram Type
                  </label>
                  <input
                    type="text"
                    name="enneagramType"
                    id="enneagramType"
                    value={updateFormik.values.enneagramType}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter enneagram type"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <h2 className="text-md flex items-center gap-2 text-gray-900 dark:text-white">
                Big Five Personality Scores (1-100)
              </h2>
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="openness"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Openness
                  </label>
                  <input
                    type="text"
                    name="openness"
                    id="openness"
                    value={updateFormik.values.openness}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      updateFormik.setFieldValue("openness", digitsOnly);
                    }}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter openness"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="conscientiousness"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Conscientiousness
                  </label>
                  <input
                    type="text"
                    name="conscientiousness"
                    id="conscientiousness"
                    value={updateFormik.values.conscientiousness}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      updateFormik.setFieldValue(
                        "conscientiousness",
                        digitsOnly
                      );
                    }}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter conscientiousness"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="extraversion"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Extraversion
                  </label>
                  <input
                    type="text"
                    name="extraversion"
                    id="extraversion"
                    value={updateFormik.values.extraversion}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      updateFormik.setFieldValue("extraversion", digitsOnly);
                    }}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter extraversion"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="agreeableness"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Agreeableness
                  </label>
                  <input
                    type="text"
                    name="agreeableness"
                    id="agreeableness"
                    value={updateFormik.values.agreeableness}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      updateFormik.setFieldValue("agreeableness", digitsOnly);
                    }}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter agreeableness"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="neuroticism"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Neuroticism
                  </label>
                  <input
                    type="text"
                    id="neuroticism"
                    name="neuroticism"
                    value={updateFormik.values.neuroticism}
                    onBlur={updateFormik.handleBlur}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      updateFormik.setFieldValue("neuroticism", digitsOnly);
                    }}
                    placeholder="Enter neuroticism"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="skillsAndAbilities"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Skills and Abilities
                  </label>
                  <textarea
                    rows={4}
                    id="skillsAndAbilities"
                    name="skillsAndAbilities"
                    value={updateFormik.values.skillsAndAbilities}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter skills and abilities"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="motivationsAndGoals"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Motivations and Goals
                  </label>
                  <textarea
                    rows={4}
                    id="motivationsAndGoals"
                    name="motivationsAndGoals"
                    value={updateFormik.values.motivationsAndGoals}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter motivations and goals"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                Physical Description
              </h2>
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="build"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Build
                  </label>
                  <input
                    type="text"
                    id="build"
                    name="build"
                    value={updateFormik.values.build}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter build"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="height"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Height
                  </label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={updateFormik.values.height}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter height"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="eyeColor"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Eye Color
                  </label>
                  <input
                    type="text"
                    id="eyeColor"
                    name="eyeColor"
                    value={updateFormik.values.eyeColor}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter eye color"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="skinTone"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Skin Tone
                  </label>
                  <input
                    type="text"
                    id="skinTone"
                    name="skinTone"
                    value={updateFormik.values.skinTone}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter skin tone"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="hairColor"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Hair Color
                  </label>
                  <input
                    type="text"
                    id="hairColor"
                    name="hairColor"
                    value={updateFormik.values.hairColor}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter hair color"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="hairStyle"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Hair Style
                  </label>
                  <input
                    type="text"
                    id="hairStyle"
                    name="hairStyle"
                    value={updateFormik.values.hairStyle}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter hair style"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="typicalAttire"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Typical Attire
                  </label>
                  <textarea
                    rows={4}
                    id="typicalAttire"
                    name="typicalAttire"
                    value={updateFormik.values.typicalAttire}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter typical attire"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="distinguishingFeatures"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Distinguishing Features
                  </label>
                  <textarea
                    rows={4}
                    id="distinguishingFeatures"
                    name="distinguishingFeatures"
                    value={updateFormik.values.distinguishingFeatures}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter distinguishing features"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="industryRelevance"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Industry Relevance
                  </label>
                  <textarea
                    rows={4}
                    id="industryRelevance"
                    name="industryRelevance"
                    value={updateFormik.values.industryRelevance}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter industry relevance"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="relevanceToScenario"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Relevance To Scenario
                  </label>
                  <textarea
                    rows={4}
                    id="relevanceToScenario"
                    name="relevanceToScenario"
                    value={updateFormik.values.relevanceToScenario}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter relevance to scenario"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="challengesAndGrowthAreas"
                    className="block mb-1 text-gray-700 text-md dark:text-white"
                  >
                    Challenges and Growth Areas
                  </label>
                  <textarea
                    rows={4}
                    id="challengesAndGrowthAreas"
                    name="challengesAndGrowthAreas"
                    value={updateFormik.values.challengesAndGrowthAreas}
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    placeholder="Enter challenges and growth areas"
                    className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                      loading
                        ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                        : "dark:bg-zinc-800 bg-zinc-50"
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="bg-zinc-200 h-[1px] w-full" />
              <div className="mt-3 flex gap-x-2 justify-end">
                <button
                  disabled={loading}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 h-fit cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!personaPrompt || loading}
                  className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
                    !personaPrompt || loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-purple-700"
                  }`}
                >
                  <AnimatedSpinner show={loading} />
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
