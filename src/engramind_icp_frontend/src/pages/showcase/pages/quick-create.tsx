"use client";

import ModalDone from "../../../components/ui/showcase/ModalDone";
import ModalProgress from "../../../components/ui/showcase/ModalProgress";
import RenderIf from "../../../utils/RenderIf";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowcaseLayout from "../ShowcaseLayout";
import { ArrowLeft, Zap } from "lucide-react";
import { FileResponse } from "../../../interface";
import { AnimatedDropdown, AnimatedSpinner } from "../../../components/ui";
import useSWR from "swr";
import { axiosElwyn, fetcherElwyn } from "../../../utils/api";
import { useFormik } from "formik";
import {
  createQuickScenarioInitialValues,
  createQuickScenarioSchema,
  CreateQuickScenarioValues,
  QuickScenarioValues,
} from "../../../formik";
import Cookies from "js-cookie";
import { scenarioPresets } from "../../../utils/helper";
import { Cross2Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export default function ShowcaseQuickCreatePage() {
  const name = Cookies.get("principal");

  const [loading, setLoading] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, seterror] = useState(false);
  const [animatedModalOpen, setAnimatedModalOpen] = useState(false);
  const [chosenScenarioPreset, setChosenScenarioPreset] = useState<
    string | null
  >(null);

  const { data: totalFilesData, mutate: filesMutate } = useSWR(
    `/conversational/files/organization?organization_id=${name}`,
    fetcherElwyn
  );

  const totalFilesResult = totalFilesData?.data?.files;

  const navigate = useNavigate();

  const createFormik = useFormik<CreateQuickScenarioValues>({
    initialValues: createQuickScenarioInitialValues,
    validationSchema: createQuickScenarioSchema,
    onSubmit: async (values, { resetForm }) => {
      const toastId = toast.loading("Creating a roleplay...", {
        id: "create-roleplay",
        duration: Infinity,
      });
      try {
        setLoading(true);
        const fileIdsTemp = values.files.map((x: FileResponse) => x.file_id);
        await axiosElwyn.post("/assessment/live/scenarios/quick-create", {
          scenario_title: values.scenario_title,
          ai_role: values.ai_role,
          my_role: values.my_role,
          scenario_description: values.scenario_description,
          organization_id: name,
          file_ids: fileIdsTemp,
        });
        toast.success("Roleplay created successfully!", {
          id: toastId,
          duration: 4000,
        });
        setLoading(false);
        navigate("/showcase");
      } catch (e) {
        toast.error(e?.toString(), {
          id: toastId,
          duration: 4000,
        });
        setLoading(false);
        console.log(e);
      }
    },
  });
  useEffect(() => {
    (async () => {
      await createFormik.validateForm();
    })();
  }, []);
  return (
    <ShowcaseLayout>
      <div className="max-w-3xl mx-auto px-6 pb-6 space-y-6 text-gray-900 dark:text-white">
        {/* Form Section  */}
        <div className="space-y-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/showcase")}
              type="button"
              className="cursor-pointer focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-8 rounded-md text-xs mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
              <Zap /> Quick Create Scenario
            </h2>
          </div>
          <form className="space-y-6" onSubmit={createFormik.handleSubmit}>
            <div>
              <label
                htmlFor="scenario_title"
                className="block mb-1 text-sm text-gray-700 dark:text-white"
              >
                Scenario Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="scenario_title"
                name="scenario_title"
                value={createFormik.values.scenario_title}
                onChange={createFormik.handleChange}
                placeholder="Enter scenario title"
                className={`w-full border shadow-sm outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                  loading
                    ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                    : "dark:bg-zinc-800 bg-zinc-50"
                }`}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-white">
                Scenario Preset (optional)
              </label>
              <AnimatedDropdown
                loading={loading}
                label={`${
                  chosenScenarioPreset === null || chosenScenarioPreset === ""
                    ? "Select a preset to prefill fields..."
                    : chosenScenarioPreset
                }`}
                labelPlaceholder={
                  chosenScenarioPreset === null || chosenScenarioPreset === ""
                }
                isNested
                options={scenarioPresets}
                onReset={async () => {
                  createFormik.resetForm();
                  setChosenScenarioPreset("");
                  await createFormik.validateForm();
                }}
                onSelect={async (e: QuickScenarioValues) => {
                  setChosenScenarioPreset(e.title);
                  await createFormik.setFieldValue("my_role", e.my_role);
                  await createFormik.setFieldValue("ai_role", e.ai_role);
                  await createFormik.setFieldValue(
                    "scenario_description",
                    e.scenario_description
                  );
                  await createFormik.setFieldValue("scenario_title", e.title);
                  await createFormik.validateForm();
                }}
                customClassName="w-[100%]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="my_role"
                  className="block mb-1 text-sm text-gray-700 dark:text-white"
                >
                  My Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="my_role"
                  name="my_role"
                  value={createFormik.values.my_role}
                  onChange={createFormik.handleChange}
                  placeholder="Enter your role (e.g., 'Sales')"
                  className={`w-full border shadow-sm outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                    loading
                      ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                      : "dark:bg-zinc-800 bg-zinc-50"
                  }`}
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="ai_role"
                  className="block mb-1 text-sm text-gray-700 dark:text-white"
                >
                  AI Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="ai_role"
                  name="ai_role"
                  value={createFormik.values.ai_role}
                  onChange={createFormik.handleChange}
                  placeholder="Enter AI's role (e.g., 'Customer')"
                  className={`w-full border shadow-sm outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                    loading
                      ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                      : "dark:bg-zinc-800 bg-zinc-50"
                  }`}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="md:flex-row flex-col flex justify-between items-center mb-3">
              <label className="block mb-3 md:mb-1 flex flex-1 text-md text-gray-700 dark:text-white">
                Add Source File
              </label>
              <AnimatedDropdown
                loading={loading}
                label="Select file to add..."
                options={totalFilesResult
                  ?.filter((x: FileResponse) => {
                    const currentIds = createFormik.values.files.map(
                      (x: FileResponse) => x.file_id
                    );
                    return !currentIds.includes(x.file_id);
                  })
                  .map((result: FileResponse) => ({
                    name: result.filename,
                    id: result.file_id,
                  }))}
                onSelect={(e) => {
                  createFormik.setFieldValue("files", [
                    ...createFormik.values.files,
                    totalFilesResult?.find(
                      (x: FileResponse) => x.file_id === e.id
                    ),
                  ]);
                }}
                customClassName="w-[100%] md:w-[80%]"
              />
            </div>
            <div className="md:flex-row flex-col flex gap-x-2 items-center justify-end md:mb-0 mb-3">
              <p className="italic text-[14px] text-[#627084] md:mb-0 mb-3">
                Do you not have the file you need?
              </p>
              <button
                disabled={loading}
                type="button"
                onClick={() => setAnimatedModalOpen(true)}
                className={`bg-purple-600 text-white px-4 py-2 rounded-full cursor-pointer`}
              >
                Upload New File
              </button>
            </div>
            {createFormik?.values?.files &&
              createFormik?.values?.files?.length > 0 && (
                <div className="mb-2 w-full">
                  <p>Selected files:</p>
                  <div
                    className={`relative inline-block text-left mt-1 w-full`}
                  >
                    <div
                      className={`w-full flex gap-x-2 flex-wrap shadow-sm border text-[#888] focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded text-left px-2 py-1 text-[14px]`}
                    >
                      {createFormik?.values?.files?.map(
                        (val: FileResponse, index) => (
                          <div
                            key={index}
                            className="flex gap-x-2 items-center rounded-md dark:bg-zinc-800 bg-zinc-200 px-2 py-1 text-sm my-1"
                          >
                            <p>{val?.filename}</p>
                            <div
                              onClick={() => {
                                createFormik.setFieldValue(
                                  "files",
                                  createFormik.values.files.filter(
                                    (x: FileResponse) =>
                                      x.file_id !== val.file_id
                                  )
                                );
                              }}
                              className="cursor-pointer p-[2px] rounded-full hover:bg-black dark:hover:bg-white"
                            >
                              <Cross2Icon fontSize={5} />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            <div>
              <label
                htmlFor="scenario_description"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-white"
              >
                Scenario Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="scenario_description"
                name="scenario_description"
                value={createFormik.values.scenario_description}
                onChange={createFormik.handleChange}
                placeholder="Make a scenario based on the uploaded document on page 3"
                className={`w-full border shadow-sm outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                  loading
                    ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                    : "dark:bg-zinc-800 bg-zinc-50"
                }`}
                rows={6}
                disabled={loading}
              />
            </div>

            <div className="flex w-full justify-end">
              <button
                type="submit"
                disabled={
                  !(createFormik.isValid && createFormik.dirty) || loading
                }
                className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
                  !(createFormik.isValid && createFormik.dirty) || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-700"
                }`}
              >
                <AnimatedSpinner show={loading} />
                {loading ? "Creating..." : "Create Scenario"}
              </button>
            </div>
          </form>
        </div>
        {/* End Form Section */}

        {/* Modal Loading Section */}
        <RenderIf condition={showLoadingModal}>
          <ModalProgress setShowLoadingModal={setShowLoadingModal} />
        </RenderIf>

        {/* Modal Success */}
        <RenderIf condition={showSuccessModal}>
          <ModalDone setShowSuccessModal={setShowSuccessModal} />
        </RenderIf>

        {/* Modal Error  */}
        <RenderIf condition={error}>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                Error
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Failed to create persona. Please try again.
              </p>
              <button
                type="button"
                onClick={() => seterror(false)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          </div>
        </RenderIf>
      </div>
    </ShowcaseLayout>
  );
}
