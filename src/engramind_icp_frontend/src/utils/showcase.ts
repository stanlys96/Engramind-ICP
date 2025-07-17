import { FormikProps } from "formik";
import { EditFormValues } from "../formik";
import { PersonaData } from "../interface";

export const populateUpdateFormik = (
  updateFormik: FormikProps<EditFormValues>,
  personaData: PersonaData
) => {
  updateFormik.setFieldValue("id", personaData?.id);
  updateFormik.setFieldValue("name", personaData?.name);
  updateFormik.setFieldValue(
    "persona_name",
    personaData?.persona_details?.name
  );
  updateFormik.setFieldValue("age", personaData?.persona_details?.age);
  updateFormik.setFieldValue("gender", personaData?.persona_details?.gender);
  updateFormik.setFieldValue(
    "occupation",
    personaData?.persona_details?.occupation
  );
  updateFormik.setFieldValue(
    "language",
    personaData?.persona_details?.language
  );
  updateFormik.setFieldValue(
    "hometown",
    personaData?.persona_details?.hometown
  );
  updateFormik.setFieldValue(
    "birthdate",
    personaData?.persona_details?.birthdate
  );
  updateFormik.setFieldValue(
    "nationality",
    personaData?.persona_details?.nationality
  );
  updateFormik.setFieldValue(
    "background",
    personaData?.persona_details?.background
  );
  updateFormik.setFieldValue(
    "scenarioSnippet",
    personaData?.persona_details?.scenarioSnippet
  );
  updateFormik.setFieldValue(
    "mbtiType",
    personaData?.persona_details?.personalityTraits?.mbtiType
  );
  updateFormik.setFieldValue(
    "enneagramType",
    personaData?.persona_details?.personalityTraits?.enneagramType
  );
  updateFormik.setFieldValue(
    "openness",
    personaData?.persona_details?.personalityTraits?.bigFive?.openness
  );
  updateFormik.setFieldValue(
    "conscientiousness",
    personaData?.persona_details?.personalityTraits?.bigFive?.conscientiousness
  );
  updateFormik.setFieldValue(
    "extraversion",
    personaData?.persona_details?.personalityTraits?.bigFive?.extraversion
  );
  updateFormik.setFieldValue(
    "agreeableness",
    personaData?.persona_details?.personalityTraits?.bigFive?.agreeableness
  );
  updateFormik.setFieldValue(
    "neuroticism",
    personaData?.persona_details?.personalityTraits?.bigFive?.neuroticism
  );
  updateFormik.setFieldValue(
    "skillsAndAbilities",
    personaData?.persona_details?.skillsAndAbilities
  );
  updateFormik.setFieldValue(
    "motivationsAndGoals",
    personaData?.persona_details?.motivationsAndGoals
  );
  updateFormik.setFieldValue(
    "build",
    personaData?.persona_details?.physicalDescription?.build
  );
  updateFormik.setFieldValue(
    "height",
    personaData?.persona_details?.physicalDescription?.height
  );
  updateFormik.setFieldValue(
    "eyeColor",
    personaData?.persona_details?.physicalDescription?.eyeColor
  );
  updateFormik.setFieldValue(
    "skinTone",
    personaData?.persona_details?.physicalDescription?.skinTone
  );
  updateFormik.setFieldValue(
    "hairColor",
    personaData?.persona_details?.physicalDescription?.hairColor
  );
  updateFormik.setFieldValue(
    "hairStyle",
    personaData?.persona_details?.physicalDescription?.hairStyle
  );
  updateFormik.setFieldValue(
    "typicalAttire",
    personaData?.persona_details?.physicalDescription?.typicalAttire
  );
  updateFormik.setFieldValue(
    "distinguishingFeatures",
    personaData?.persona_details?.physicalDescription?.distinguishingFeatures
  );
  updateFormik.setFieldValue(
    "industryRelevance",
    personaData?.persona_details?.industryRelevance
  );
  updateFormik.setFieldValue(
    "relevanceToScenario",
    personaData?.persona_details?.relevanceToScenario
  );
  updateFormik.setFieldValue(
    "challengesAndGrowthAreas",
    personaData?.persona_details?.challengesAndGrowthAreas
  );
};

export const handleUpdateFormikBody = (values: EditFormValues) => {
  return {
    name: values.name,
    persona_details: {
      name: values.persona_name,
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
