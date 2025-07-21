import * as Yup from "yup";

export const createQuickScenarioInitialValues = {
  scenario_title: "",
  scenario_description: "",
  ai_role: "",
  my_role: "",
  files: [],
};

export const createQuickScenarioSchema = Yup.object({
  scenario_title: Yup.string().required(),
  scenario_description: Yup.string().required(),
  ai_role: Yup.string().required(),
  my_role: Yup.string().required(),
});
