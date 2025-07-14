import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  email?: string;
  type?: "success" | "error";
};

export default function Modal({
  isOpen,
  onClose,
  title,
  email,
  type = "success",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 p-8"
    >
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-md max-w-md w-full text-center shadow-xl">
        {title && (
          <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
        )}
        <p
          className={`text-sm mb-6 ${
            type === "error"
              ? "text-red-600 dark:text-red-400"
              : "text-neutral-700 dark:text-neutral-300"
          }`}
        >
          {type === "error"
            ? "Oops! Something went wrong. Please try again later or contact support if the issue persists."
            : "Thank you for your interest! Your submission has been received and you are now on our waitlist."}
          {email && type !== "error" && (
            <p className="mt-2">
              <br />
              We will notify you at <strong>{email}</strong> with early-access
              details and exclusive offers.
            </p>
          )}
        </p>
        <div className="flex flex-col gap-3 items-center">
          <button
            type="button"
            onClick={onClose}
            className={`px-6 py-2 rounded-md transition-colors cursor-pointer ${
              type === "error"
                ? "bg-red-600 text-white hover:bg-red-500"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            Close
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-6">&copy; 2025 Eternity</p>
      </div>
    </div>
  );
}
