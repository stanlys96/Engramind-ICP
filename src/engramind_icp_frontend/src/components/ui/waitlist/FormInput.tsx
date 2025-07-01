import React from 'react';

export const FormInput = ({
  form,
  handleChange,
  name,
  label,
  type,
  placeholder,
  required,
}: {
  form: {
    name: string;
    email: string;
    occupation: string;
    knowGenAI: string;
    reason: string;
  };
  required?: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  name: string;
  label: string;
  type: string;
  placeholder: string;
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium dark:text-neutral-300 text-neutral-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        onChange={handleChange}
        value={form[name as keyof typeof form]}
        className="w-full rounded-md border dark:border-neutral-600 border-zinc-300 dark:bg-neutral-700 bg-zinc-50 p-3 text-sm lg:text-base dark:text-neutral-50 text-zinc-800 placeholder-neutral-500 focus:border-indigo-500 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};
