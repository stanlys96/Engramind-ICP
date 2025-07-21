import { LucideCopy } from "lucide-react";

interface Props {
  message?: string;
  element?: React.ReactNode;
}

export const AIMessage = ({ message, element }: Props) => {
  return (
    <div className="mr-4 md:mr-10 my-2 flex gap-2">
      <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-600 flex items-center justify-center text-white">
        AI
      </div>
      <div className="flex-col max-w-[calc(100%-3.5rem)]">
        <small className="text-sm font-medium leading-none">Assistant</small>
        <div className="rounded-xl border border-[#88888850] bg-card text-card-foreground shadow pt-5 rounded-tl mt-1">
          <div className="p-6 pt-0 text-sm -m-2 [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content break-words">
            <div className="text-black dark:text-slate-200 prose dark:prose-invert text-sm [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content">
              {message && <p>{message}</p>}
              {element}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-0.25">
          <button
            type="button"
            className="focus-visible:ring-ring cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 scale-75"
          >
            <LucideCopy size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
