import React from "react";

export const ModalProgress = ({
  setShowLoadingModal,
}: {
  setShowLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col mx-auto justify-center items-center gap-4 px-0 md:px-[50px]">
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
  );
};
