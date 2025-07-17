import { SquarePen } from "lucide-react";
import { Assessment, Criterum } from "../../../interface";
import { capitalCase } from "../../../utils/helper";

interface Props {
  rubrics: Assessment | null;
  onEditPress?: () => void;
}

export const RubricsDetail = ({ rubrics, onEditPress }: Props) => {
  return (
    <div>
      <p className="font-bold text-[22px]">{rubrics?.name}</p>
      <div className="flex w-full justify-end">
        <button
          type="button"
          onClick={onEditPress}
          className="cursor-pointer focus-visible:ring-ring inline-flex gap-x-2 items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-[#88888850] bg-[#FAFAFA] dark:bg-[#18181B] hover:bg-accent hover:text-accent-foreground border shadow-sm px-4 py-2"
        >
          <SquarePen size={15} />
          <span>Edit Rubric</span>
        </button>
      </div>
      <p className="text-[20px] font-semibold">
        {rubrics?.rubrics?.rubric_title}
      </p>
      <p className="text-sm italic">{rubrics?.rubrics?.description}</p>
      <div className="mt-5 flex flex-col gap-y-6">
        {rubrics?.rubrics?.criteria?.map((value: Criterum) => (
          <div className="border border-[#88888850] rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-zinc-900 p-3 flex justify-between items-center">
              <h4 className="font-semibold">{value?.criterion_name}</h4>
              <span className="text-sm px-2 py-1 rounded">
                Weight: {value?.weight}%
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-zinc-800">
                    <th className="p-2 text-left">Performance Level</th>
                    <th className="p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {value?.performance_levels &&
                    Object.entries(value?.performance_levels).map(
                      ([key, val], pIndex) => (
                        <tr className="border-t border-[#F1F2F4] dark:border-[#88888850]">
                          <td className="p-2 capitalize font-medium w-1/4">
                            {key}
                          </td>
                          <td className="p-2">{val}</td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[20px] font-semibold mt-[20px]">Scoring Guide</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {rubrics?.rubrics?.scoring_guide &&
          Object.entries(rubrics?.rubrics?.scoring_guide).map(
            ([key, val], pIndex) => (
              <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <p className="font-medium mb-1 font-semibold">
                  {capitalCase(key)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {val}
                </p>
              </div>
            )
          )}
      </div>
      <p className="text-[20px] font-semibold mt-[20px]">
        Performance Levels Summary
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
        {rubrics?.rubrics?.performance_levels_summary &&
          Object.entries(rubrics?.rubrics?.performance_levels_summary).map(
            ([key, val], pIndex) => (
              <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <p className="font-medium mb-1 font-semibold">{key}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {val}
                </p>
              </div>
            )
          )}
      </div>
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <span className="font-medium">Note:</span> {rubrics?.rubrics?.note}
        </p>
      </div>
    </div>
  );
};
