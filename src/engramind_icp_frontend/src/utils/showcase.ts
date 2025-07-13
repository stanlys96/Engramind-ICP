import { FormikProps } from "formik";
import { EditFormValues } from "../formik";
import { PersonaResponse } from "../interface";

export const populateUpdateFormik = (
  updateFormik: FormikProps<EditFormValues>,
  personaResponse: PersonaResponse
) => {
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
    personaResponse?.data?.persona_details?.personalityTraits?.enneagramType
  );
  updateFormik.setFieldValue(
    "openness",
    personaResponse?.data?.persona_details?.personalityTraits?.bigFive?.openness
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
    personaResponse?.data?.persona_details?.physicalDescription?.typicalAttire
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
};

export const handleUpdateFormikBody = (values: EditFormValues) => {
  return {
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
  };
};
