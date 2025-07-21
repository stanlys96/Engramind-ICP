interface Props {
  handleLogout: () => void;
  setShowConfirm: (val: boolean) => void;
}

export const LogoutForm = ({ handleLogout, setShowConfirm }: Props) => {
  return (
    <div>
      <p className="text-lg mb-4 text-zinc-800 font-semibold dark:text-zinc-100 text-center">
        Are you sure you want to logout?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
        >
          Yes
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="px-4 py-2 cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
