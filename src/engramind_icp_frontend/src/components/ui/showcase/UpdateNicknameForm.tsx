import { useState } from "react";
import { AnimatedSpinner } from "../AnimatedSpinner";

interface Props {
  handleUpdateNickname: (newNickname: string) => void;
  setShowUpdateNickname: (val: boolean) => void;
  loading?: boolean;
  currentNickname: string;
}

export const UpdateNicknameForm = ({
  handleUpdateNickname,
  setShowUpdateNickname,
  loading,
  currentNickname,
}: Props) => {
  const [nickname, setNickname] = useState(currentNickname);
  const disableSubmitButton = loading || !nickname;
  return (
    <div className="w-full">
      <p className="text-lg mb-4 text-zinc-800 font-semibold dark:text-zinc-100 text-center">
        Update Your Nickname
      </p>
      <div className="mb-2">
        <label
          htmlFor="name"
          className="block mb-1 text-gray-700 text-md dark:text-white"
        >
          Nickname <span className="text-red-500">*</span>
        </label>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          id="name"
          name="name"
          type="text"
          placeholder="Enter nickname"
          className={`w-full border shadow-sm focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
            loading
              ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
              : "dark:bg-zinc-800 bg-zinc-50"
          }`}
          disabled={loading}
        />
      </div>
      <div className="flex justify-end mt-5 gap-x-3">
        <button
          type="button"
          disabled={loading}
          onClick={() => setShowUpdateNickname(false)}
          className="px-4 py-2 h-fit cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleUpdateNickname(nickname)}
          disabled={disableSubmitButton}
          className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
            disableSubmitButton
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-700"
          }`}
        >
          <AnimatedSpinner show={loading} />
          {loading ? "Updating..." : "Update Nickname"}
        </button>
      </div>
    </div>
  );
};
