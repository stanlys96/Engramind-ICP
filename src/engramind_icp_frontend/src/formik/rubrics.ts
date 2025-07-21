import * as Yup from "yup";

export const createRubricInitialValues = {
  name: "",
  description: "",
  files: [],
};

export const createRubricsSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
});
