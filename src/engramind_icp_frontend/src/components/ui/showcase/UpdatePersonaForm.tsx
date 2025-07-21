import { FormikProps } from "formik";
import { EditFormValues } from "../../../formik/interface";
import { AnimatedSpinner } from "../AnimatedSpinner";

interface UpdatePersonaForm {
  loading: boolean;
  updateFormik: FormikProps<EditFormValues>;
  setIsOpen: (value: boolean) => void;
}

export const UpdatePersonaForm = ({
  loading,
  updateFormik,
  setIsOpen,
}: UpdatePersonaForm) => {
  const disableButton = loading || !updateFormik.isValid;
  return (
    <form onSubmit={updateFormik.handleSubmit}>
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
        Edit Persona: {updateFormik.values.name}
      </h2>
      <div className="gap-y-3 flex flex-col">
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="persona_name"
              className="block mb-1 text-gray-700 text-md dark:text-white"
            >
              Name
            </label>
            <input
              id="persona_name"
              name="persona_name"
              type="text"
              value={updateFormik.values.persona_name}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Enter persona name"
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
                updateFormik.setFieldValue("conscientiousness", digitsOnly);
              }}
              onBlur={updateFormik.handleBlur}
              placeholder="Enter conscientiousness"
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
              className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                loading
                  ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                  : "dark:bg-zinc-800 bg-zinc-50"
              }`}
              disabled={loading}
            />
          </div>
        </div>
        <div className="dark:bg-[#88888850] bg-zinc-200 h-[1px] w-full" />
        <div className="mt-3 flex gap-x-2 justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 h-fit cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={disableButton}
            className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
              disableButton
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
  );
};
