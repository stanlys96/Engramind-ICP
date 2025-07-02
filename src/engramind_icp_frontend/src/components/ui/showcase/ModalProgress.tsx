import React from "react";

export default function ModalProgress({
  setShowLoadingModal,
}: {
  setShowLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0 z-50 dark:bg-zinc-900/50  backdrop-blur-sm flex items-center justify-center">
      <div className="fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 bg-black dark:bg-background p-6 shadow-lg sm:rounded-lg md:w-full w-full max-w-3xl overflow-y-auto max-h-[95vh]">
        <div className="flex flex-col mx-auto justify-center items-center gap-4">
          <img
            className="w-full h-64"
            width={1241}
            height={619}
            src={"/assets/prepare.gif"}
            alt="Preparing your persona"
          />
          <div className="font-bold text-md text-zinc-100 dark:text-white">
            This process will take about 1 to 2 minutes
          </div>
          <div className="font-light text-sm text-zinc-200 dark:text-gray-300">
            {
              "If you don't want to wait, you can close this, and we will notify you when it’s done"
            }
          </div>
          <button
            type="button"
            className="bg-zinc-700 cursor-pointer hover:bg-zinc-600 text-white px-4 py-2 rounded-full"
            onClick={() => setShowLoadingModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
