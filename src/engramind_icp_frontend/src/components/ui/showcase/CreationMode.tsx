import { Palette, Zap } from "lucide-react";
import { useState } from "react";
import { Category } from "../../../utils/helper";

interface Props {
  onClose: () => void;
  onChooseMode: (mode: Category) => void;
}

export const CreationMode = ({ onClose, onChooseMode }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  return (
    <div className="w-full">
      <h2
        className={`text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]`}
      >
        Select Creation Mode
      </h2>
      <p className="text-[#73808C] mb-2">
        Select how you would like to create your scenario
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 font-nunito w-full">
        <div
          onClick={() => {
            setSelectedCategory(Category.Quick);
          }}
          className={`border transition-all rounded-lg p-6 ${
            selectedCategory === Category.Quick
              ? "border-green-600 dark:border-green-500"
              : "border-transparent"
          } flex gap-x-4 items-center cursor-pointer transition-all bg-zinc-100 dark:bg-zinc-800`}
        >
          <Zap />
          <div>
            <p className="font-semibold">Quick Creation</p>
            <p className="text-[#73808C]">One step to creation</p>
          </div>
        </div>
        <div
          onClick={() => setSelectedCategory(Category.Advanced)}
          className={`border transition-all rounded-lg p-6 ${
            selectedCategory === Category.Advanced
              ? "border-green-600 dark:border-green-500"
              : "border-transparent"
          } flex gap-x-4 items-center cursor-pointer transition-all bg-zinc-100 dark:bg-zinc-800`}
        >
          <Palette />
          <div>
            <p className="font-semibold">Advanced Creation</p>
            <p className="text-[#73808C]">Four steps to creation</p>
          </div>
        </div>
      </div>
      <div className="flex gap-x-3 w-full justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 h-fit cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            if (selectedCategory !== null) {
              onChooseMode(selectedCategory);
            }
          }}
          className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-700`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};
