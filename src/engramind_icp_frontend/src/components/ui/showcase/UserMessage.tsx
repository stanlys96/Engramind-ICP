interface Props {
  message: string;
}

export const UserMessage = ({ message }: Props) => {
  return (
    <div className="ml-4 md:ml-10 my-2 flex flex-col items-end">
      <div className="flex-col max-w-[calc(100%-3.5rem)]">
        <div className="rounded-xl border border-[#88888850] bg-card text-card-foreground shadow pt-5 rounded-tr">
          <div className="p-6 pt-0 text-sm -m-2 [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content break-words">
            <div className="text-black dark:text-slate-200 prose dark:prose-invert text-sm [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content">
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
