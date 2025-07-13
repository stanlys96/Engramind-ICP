import { Field, FieldArray, Form, Formik } from "formik";
import { AnimatedSpinner } from "../AnimatedSpinner";
import { Trash2 } from "lucide-react";
import { FlatFormValues } from "../../../pages/showcase/pages/rubrics";
import { EditableKeyValue } from "./EditableKeyValue";

interface UpdateRubricsForm {
  loading: boolean;
  setIsOpen: (value: boolean) => void;
  updateRubricsFormValues: FlatFormValues;
  rubricId: string;
  setLoading: (value: boolean) => void;
}

const capitalCase = (str: string) =>
  str
    .replace(/_/g, " ") // replace underscores with spaces
    .replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );

export const UpdateRubricsForm = ({
  loading,
  setIsOpen,
  updateRubricsFormValues,
  rubricId,
  setLoading,
}: UpdateRubricsForm) => {
  return (
    <Formik
      initialValues={updateRubricsFormValues}
      enableReinitialize
      onSubmit={async (values) => {
        setIsOpen(false);
        // console.log(values);
        // try {
        //   setLoading(true);
        //   const response = await axios.put(
        //     `${API_BASE_URL}/assessment/rubrics/${rubricId}`,
        //     {
        //       name: values.name,
        //       rubrics: JSON.stringify(values),
        //     },
        //     {
        //       headers: {
        //         "X-AI_TOKEN": API_KEY,
        //         "X-REQUEST_FROM": API_REQUEST_FROM,
        //       },
        //     }
        //   );
        //   console.log(response.data, "<<< DATA");
        //   addToast({ message: "Successfully created your rubrics!" });
        //   setLoading(false);
        //   setIsOpen(false);
        // } catch (e) {
        //   setLoading(false);
        // }
      }}
    >
      {({ setFieldValue }) => (
        <Form className="h-[85vh] overflow-scroll">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
            Edit Created Rubric
          </h2>
          <div className="gap-y-3 flex flex-col">
            <div className="flex gap-x-4 w-full">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-1 text-gray-700 text-md dark:text-white"
                >
                  Rubric Name
                </label>
                <Field
                  as="input"
                  id={"name"}
                  name={"name"}
                  className={`w-full shadow-sm border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                    loading
                      ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                      : "dark:bg-zinc-800 bg-zinc-50"
                  }`}
                  disabled
                />
              </div>
            </div>
            <div className="flex gap-x-4 w-full">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-1 text-gray-700 text-md dark:text-white"
                >
                  Rubric Title
                </label>
                <Field
                  as="input"
                  id={"rubric_title"}
                  name={"rubric_title"}
                  className={`w-full shadow-sm border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                    loading
                      ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                      : "dark:bg-zinc-800 bg-zinc-50"
                  }`}
                  disabled
                />
              </div>
            </div>
            <div className="flex gap-x-4 w-full">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-1 text-gray-700 text-md dark:text-white"
                >
                  Description
                </label>
                <Field
                  disabled
                  as="textarea"
                  rows={3}
                  id={"description"}
                  name={"description"}
                  className={`w-full shadow-sm border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                    loading
                      ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                      : "dark:bg-zinc-800 bg-zinc-50"
                  }`}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
                Criteria
              </h2>
              <h2 className="text-md flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
                Total Weight: 100%
              </h2>
            </div>
            <FieldArray name="criteria">
              {() => (
                <div>
                  {updateRubricsFormValues?.["criteria"]?.map(
                    (criterion: any, cIndex: any) => (
                      <div
                        key={cIndex}
                        className="p-[20px] shadow-md border rounded-xl dark:border-zinc-700 border-zinc-200 mb-[15px]"
                      >
                        <div className="flex gap-x-2 items-center">
                          <div className="w-full flex-3">
                            <label>Criterion Name</label>
                            <Field
                              id={`criteria[${cIndex}].criterion_name`}
                              name={`criteria[${cIndex}].criterion_name`}
                              as="input"
                              className={`w-full shadow-sm border mt-2 focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                                loading
                                  ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                                  : "dark:bg-zinc-800 bg-zinc-50"
                              }`}
                              disabled
                            />
                          </div>
                          <div className="w-full flex-1">
                            <label>Weight (%)</label>
                            <Field
                              id={`criteria[${cIndex}].weight`}
                              name={`criteria[${cIndex}].weight`}
                              as="input"
                              className={`w-full shadow-sm border border-[#EBB305] mt-2 focus-visible:outline-none rounded p-2 text-sm ${
                                loading
                                  ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                                  : "dark:bg-zinc-800 bg-zinc-50"
                              }`}
                              disabled
                            />
                          </div>
                          <button
                            className="p-[10px] cursor-pointer border border-[#FECACA] rounded-xl"
                            type="button"
                          >
                            <Trash2 color="#DC2625" size={20} />
                          </button>
                        </div>
                        <div className="flex justify-between mt-2 items-center">
                          <p className="my-3">Performance Levels</p>
                          <button
                            className="cursor-pointer shadow-sm w-fit h-fit bg-[#EFF6FF] text-[#1C4ED8] text-[12px] px-[10px] py-[5px] rounded-md border border-[#BFDBFE]"
                            type="button"
                          >
                            + Add Level
                          </button>
                        </div>
                        {criterion?.performance_levels &&
                          Object.entries(criterion?.performance_levels)?.map(
                            ([key, val], pIndex) => {
                              return (
                                <EditableKeyValue
                                  loading={loading}
                                  cIndex={cIndex}
                                  key={pIndex}
                                  value={val}
                                  originalKey={key}
                                  pathPrefix={`criteria[${cIndex}].performance_levels`}
                                  allKeys={Object.keys(
                                    criterion.performance_levels
                                  )}
                                  onKeyChange={(newKey) => {
                                    const updated = {
                                      ...criterion.performance_levels,
                                    };
                                    const value = updated[key];
                                    delete updated[key];
                                    updated[newKey] = value;
                                    setFieldValue(
                                      `criteria[${cIndex}].performance_levels`,
                                      updated
                                    );
                                  }}
                                />
                              );
                            }
                          )}
                      </div>
                    )
                  )}
                </div>
              )}
            </FieldArray>
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
              Scoring Guide
            </h2>
            <div className="p-[20px] flex flex-col gap-y-4 shadow-md border rounded-xl dark:border-zinc-700 border-zinc-200">
              {updateRubricsFormValues?.["scoring_guide"] &&
                Object.entries(updateRubricsFormValues?.["scoring_guide"])?.map(
                  ([key]) => (
                    <div>
                      <label
                        htmlFor="birthdate"
                        className="block mb-1 text-gray-700 text-md dark:text-white"
                      >
                        {capitalCase(key)}
                      </label>
                      <Field
                        as="input"
                        name={`scoring_guide.${key}`}
                        id={`scoring_guide.${key}`}
                        className={`w-full shadow-sm border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                          loading
                            ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                            : "dark:bg-zinc-800 bg-zinc-50"
                        }`}
                        disabled
                      />
                    </div>
                  )
                )}
            </div>
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white my-[15px]">
              Performance Levels Summary
            </h2>
            <div className="p-[20px] grid grid-cols-2 gap-4 shadow-md border rounded-xl dark:border-zinc-700 border-zinc-200">
              {updateRubricsFormValues?.["performance_levels_summary"] &&
                Object.keys(
                  updateRubricsFormValues?.["performance_levels_summary"]
                )?.map((key) => (
                  <div>
                    <label
                      htmlFor="birthdate"
                      className="block mb-1 text-gray-700 text-md dark:text-white"
                    >
                      {key} Range
                    </label>
                    <Field
                      as="input"
                      name={`performance_levels_summary.${key}`}
                      id={`performance_levels_summary.${key}`}
                      className={`w-full shadow-sm border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                        loading
                          ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                          : "dark:bg-zinc-800 bg-zinc-50"
                      }`}
                      disabled
                    />
                  </div>
                ))}
            </div>
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white my-[15px]">
              Additional Note
            </h2>
            <div className="p-[20px] flex flex-col gap-y-4 shadow-md border rounded-xl dark:border-zinc-700 border-zinc-200">
              <div>
                <label
                  htmlFor="birthdate"
                  className="block mb-1 text-gray-700 text-md dark:text-white"
                >
                  Note
                </label>
                <Field
                  as="textarea"
                  rows={4}
                  name="note"
                  id="note"
                  className={`w-full shadow-sm border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                    loading
                      ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                      : "dark:bg-zinc-800 bg-zinc-50"
                  }`}
                  disabled
                />
              </div>
            </div>
            <div className="mt-3 flex gap-x-2 justify-end">
              <button
                type="submit"
                className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-700"
                }`}
              >
                <AnimatedSpinner show={loading} />
                OK
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
