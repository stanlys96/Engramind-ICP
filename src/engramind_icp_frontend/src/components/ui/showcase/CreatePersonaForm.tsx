import { FormikProps } from "formik";
import { CreateFormValues } from "../../../formik/interface";
import { AnimatedDropdown } from "../AnimatedDropdown";
import { AnimatedSpinner } from "../AnimatedSpinner";
import { UploadFileForm } from "./UploadFileForm";
import { AnimatedModal } from "../AnimatedModal";
import { useState } from "react";
import Cookies from "js-cookie";
import useSWR from "swr";
import { fetcherElwyn } from "../../../utils/api";
import { FileResponse } from "../../../interface";
import { Cross2Icon } from "@radix-ui/react-icons";

interface CreatePersonaForm {
  loading: boolean;
  createFormik: FormikProps<CreateFormValues>;
  setIsOpen: (value: boolean) => void;
  uploading: boolean;
  setUploading: (value: boolean) => void;
}

export const CreatePersonaForm = ({
  loading,
  createFormik,
  setIsOpen,
  uploading,
  setUploading,
}: CreatePersonaForm) => {
  const name = Cookies.get("principal");
  const [animatedModalOpen, setAnimatedModalOpen] = useState(false);

  const { data: totalFilesData, mutate: filesMutate } = useSWR(
    `/conversational/files/organization?organization_id=${name}`,
    fetcherElwyn
  );

  const totalFilesResult = totalFilesData?.data?.files;
  return (
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
              totalFilesResult?.find((x: FileResponse) => x.file_id === e.id),
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
            <div className={`relative inline-block text-left mt-1 w-full`}>
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
                              (x: FileResponse) => x.file_id !== val.file_id
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
        className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
        className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
          loading || uploading
            ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
            : "dark:bg-zinc-800 bg-zinc-50"
        }`}
        rows={4}
        disabled={loading}
      />
      <div className="flex justify-end mt-5 gap-x-3">
        <button
          type="button"
          disabled={loading || uploading}
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
            loading ||
            uploading
          }
          className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
            !createFormik.values.name ||
            !createFormik.values.personaPrompt ||
            loading ||
            uploading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-700"
          }`}
        >
          <AnimatedSpinner show={loading} />
          {loading ? "Creating..." : "Create Persona"}
        </button>
      </div>
      <AnimatedModal
        widthFitContainer
        isOpen={animatedModalOpen}
        onClose={() => {
          if (uploading) return;
          setAnimatedModalOpen(false);
        }}
      >
        <UploadFileForm
          setLoading={setUploading}
          setIsOpen={setAnimatedModalOpen}
          loading={uploading}
          filesMutate={filesMutate}
        />
      </AnimatedModal>
    </form>
  );
};
