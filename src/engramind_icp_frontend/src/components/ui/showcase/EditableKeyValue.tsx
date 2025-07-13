import { Field, useFormikContext } from "formik";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type EditableKeyValueProps = {
  value: any;
  originalKey: string;
  pathPrefix: string;
  allKeys: string[];
  onKeyChange: (newKey: string) => void;
  loading: boolean;
  cIndex: number;
  key: string | number;
};

export const EditableKeyValue = ({
  value,
  originalKey,
  pathPrefix,
  allKeys,
  onKeyChange,
  loading,
}: EditableKeyValueProps) => {
  const [label, setLabel] = useState(originalKey);

  const inputPath = `${pathPrefix}.${originalKey}`;

  const handleBlur = () => {
    if (
      label !== originalKey &&
      label !== "" &&
      !allKeys.includes(label) // prevent key conflicts
    ) {
      onKeyChange(label);
    }
  };

  return (
    <div className="flex gap-x-2 items-center">
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={handleBlur}
        className={`w-full flex-1 border shadow-sm mt-2 focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded px-2 py-1 text-sm ${
          loading
            ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
            : "dark:bg-zinc-800 bg-zinc-50"
        }`}
        disabled={loading}
      />
      <Field
        as="textarea"
        rows={3}
        name={inputPath}
        id={inputPath}
        className={`w-full flex-6 shadow-sm border mt-2 focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded px-2 py-1 text-sm ${
          loading
            ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
            : "dark:bg-zinc-800 bg-zinc-50"
        }`}
        disabled={loading}
      />
      <button
        className="p-[6px] cursor-pointer border border-[#FECACA] rounded-[8px]"
        type="button"
      >
        <Trash2 color="#DC2625" size={12} />
      </button>
    </div>
  );
};
