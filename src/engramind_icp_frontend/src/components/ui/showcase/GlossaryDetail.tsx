import { SquarePen } from "lucide-react";
import { GlossaryData } from "../../../interface";

interface Props {
  glossary: GlossaryData | null;
  onEditPress: () => void;
}

export const GlossaryDetail = ({ glossary, onEditPress }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-full">
          <p className="font-bold text-[22px]">{glossary?.name}</p>
          <p className="text-[#73808C]">
            Created on {glossary?.timestamp?.slice(0, 10)}
          </p>
        </div>
        <div className="flex w-full justify-end">
          <button
            type="button"
            onClick={onEditPress}
            className="cursor-pointer focus-visible:ring-ring inline-flex gap-x-2 items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-[#88888850] bg-[#FAFAFA] dark:bg-[#18181B] hover:bg-accent hover:text-accent-foreground border shadow-sm px-4 py-2"
          >
            <SquarePen size={15} />
            <span>Edit Glossary</span>
          </button>
        </div>
      </div>
      <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg mt-2">
        <p>{glossary?.glossary}</p>
      </div>
    </div>
  );
};
