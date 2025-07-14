import { FormikProps } from "formik";
import { CreateUpdateGlossaryValues } from "../../../formik/interface";
import { AnimatedSpinner } from "../AnimatedSpinner";

interface CreateOrUpdateGlossaryForm {
  loading: boolean;
  createFormik: FormikProps<CreateUpdateGlossaryValues>;
  setIsOpen: (value: boolean) => void;
}

export const CreateOrUpdateGlossaryForm = ({
  loading,
  createFormik,
  setIsOpen,
}: CreateOrUpdateGlossaryForm) => {
  return (
    <form onSubmit={createFormik.handleSubmit}>
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
        ⚡ Create New Glossary
      </h2>
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
        placeholder="Enter glossary name"
        className={`w-full shadow-sm border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
          loading
            ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
            : "dark:bg-zinc-800 bg-zinc-50"
        }`}
        disabled={loading}
      />
      <label
        htmlFor="content"
        className="block mb-1 text-gray-700 text-md dark:text-white mt-[10px]"
      >
        Glossary Content <span className="text-red-500">*</span>
      </label>
      <textarea
        id="content"
        name="content"
        value={createFormik.values.content}
        onChange={createFormik.handleChange}
        onBlur={createFormik.handleBlur}
        placeholder="Enter glossary content"
        className={`w-full shadow-sm border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
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
            !createFormik.values.name || !createFormik.values.content || loading
          }
          className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
            !createFormik.values.name || !createFormik.values.content || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-700"
          }`}
        >
          <AnimatedSpinner show={loading} />
          {loading ? "Creating..." : "Create Glossary"}
        </button>
      </div>
    </form>
  );
};
