import React from "react";

export default function ModalDone({
  setShowSuccessModal,
}: {
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-zinc-900/50  backdrop-blur-sm flex items-center justify-center">
      <div className="fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 bg-white dark:bg-background p-6 shadow-lg sm:rounded-lg md:w-full w-full max-w-3xl overflow-y-auto max-h-[95vh]">
        <div className="flex flex-col mx-auto justify-center items-center gap-4">
          <img
            className="w-full h-64"
            width={1241}
            height={619}
            src={"/assets/check.svg"}
            alt="Persona created successfully!"
          />
          <div className="font-bold text-md text-gray-900 dark:text-white">
            Persona created successfully!
          </div>
          <div className="font-light text-sm text-gray-600 dark:text-gray-300">
            Your persona has been created. You can view it in the showcase.
          </div>
          <button
            type="button"
            className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-4 py-2 rounded-full"
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
