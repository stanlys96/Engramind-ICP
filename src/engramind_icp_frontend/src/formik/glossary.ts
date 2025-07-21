import * as Yup from "yup";

export const createUpdateGlossaryInitialValues = {
  name: "",
  content: "",
  createOrUpdate: "",
  createdOn: "",
};

export const createUpdateGlossarySchema = Yup.object({
  name: Yup.string().required(),
  content: Yup.string().required(),
});
