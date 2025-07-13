import { FormikProps } from "formik";
import { CreateRubricValues } from "../../../formik/interface";
import { AnimatedDropdown } from "../AnimatedDropdown";
import { AnimatedSpinner } from "../AnimatedSpinner";

interface CreateRubricForm {
  loading: boolean;
  createFormik: FormikProps<CreateRubricValues>;
  setIsOpen: (value: boolean) => void;
}

export const CreateRubricForm = ({
  loading,
  createFormik,
  setIsOpen,
}: CreateRubricForm) => {
  return (
    <form onSubmit={createFormik.handleSubmit}>
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
        ⚡ Create New Rubrics
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
          type="button"
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
        Rubrics Name <span className="text-red-500">*</span>
      </label>
      <input
        id="name"
        name="name"
        type="text"
        onBlur={createFormik.handleBlur}
        value={createFormik.values.name}
        onChange={createFormik.handleChange}
        placeholder="Enter a name for your rubrics"
        className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
          loading
            ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
            : "dark:bg-zinc-800 bg-zinc-50"
        }`}
        disabled={loading}
      />
      <label
        htmlFor="description"
        className="block mb-1 text-gray-700 text-md dark:text-white mt-[10px]"
      >
        Rubrics Description <span className="text-red-500">*</span>
      </label>
      <textarea
        id="description"
        name="description"
        value={createFormik.values.description}
        onChange={createFormik.handleChange}
        onBlur={createFormik.handleBlur}
        placeholder="Make a rubric based on this document"
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
          type="button"
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
            !createFormik.values.description ||
            loading
          }
          className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
            !createFormik.values.name ||
            !createFormik.values.description ||
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-700"
          }`}
        >
          <AnimatedSpinner show={loading} />
          {loading ? "Saving..." : "Save Rubrics"}
        </button>
      </div>
    </form>
  );
};
