import {
  LucideCopy,
  LucideMic,
  LucidePaperclip,
  LucideSendHorizontal,
  MonitorSpeaker,
} from "lucide-react";
import { useState } from "react";
import { API_BASE_URL, API_KEY, API_REQUEST_FROM } from "../../../utils/api";
import { RoleplayResponse } from "../../../interface";

interface Props {
  currentConversation: RoleplayResponse | null;
  conversationId: string;
  onClose?: () => void;
}

export const ConversationForm = ({
  currentConversation,
  conversationId,
  onClose,
}: Props) => {
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleStream = async () => {
    setIsLoading(true);
    setResponseText("");
    const res = await fetch(`${API_BASE_URL}/conversational/roleplay-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AI_TOKEN": API_KEY,
        "X-REQUEST_FROM": API_REQUEST_FROM,
      },
      body: JSON.stringify({
        scenario_conv_list_id: conversationId,
        message: message,
      }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    let result = "";
    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
      setResponseText(result);
    }

    result += decoder.decode();
    setResponseText(result);
  };
  return (
    <div className="fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[#FEFEFE] dark:bg-[#101213] pt-5 shadow-lg sm:rounded-lg md:w-full max-w-3xl h-[90vh] flex flex-col p-0">
      <button
        type="button"
        onClick={onClose}
        className="absolute cursor-pointer top-3 right-3 text-gray-500 dark:hover:text-white hover:text-black"
      >
        ✕
      </button>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left px-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[10px]">
          Vibes Check: Handling Product Return Dispute
        </h2>
        <p className="text-[#627084]">
          Interact with the character to get a feel for the scenario. This
          conversation won't be saved or graded.
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto p-1 md:p-4">
            <div className="mr-4 md:mr-10 my-4 flex gap-2">
              <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-600 flex items-center justify-center text-white">
                AI
              </div>
              <div className="flex-col max-w-[calc(100%-3.5rem)]">
                <small className="text-sm font-medium leading-none">
                  Assistant
                </small>
                <div className="rounded-xl border bg-card text-card-foreground shadow pt-5 rounded-tl mt-1">
                  <div className="p-6 pt-0 text-sm -m-2 [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content">
                    <div className="text-black dark:text-slate-200 prose dark:prose-invert text-sm [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content">
                      <ul>
                        <li>
                          <MonitorSpeaker />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-0.25">
                  <button className="focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 scale-75">
                    <LucideCopy />
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-4 md:ml-10 my-2 flex flex-col items-end">
              <div className="flex-col max-w-[calc(100%-3.5rem)]">
                <div className="rounded-xl border bg-card text-card-foreground shadow pt-5 rounded-tr">
                  <div className="p-6 pt-0 text-sm -m-2 [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content break-words">
                    <div className="text-black dark:text-slate-200 prose dark:prose-invert text-sm [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content">
                      <p>hey</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mr-4 md:mr-10 my-2 flex gap-2">
              <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-600 flex items-center justify-center text-white">
                AI
              </div>
              <div className="flex-col max-w-[calc(100%-3.5rem)]">
                <small className="text-sm font-medium leading-none">
                  Assistant
                </small>
                <div className="rounded-xl border bg-card text-card-foreground shadow pt-5 rounded-tl mt-1">
                  <div className="p-6 pt-0 text-sm -m-2 [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content break-words">
                    <div className="text-black dark:text-slate-200 prose dark:prose-invert text-sm [&>p]:mb-4 [&>p:last-child]:mb-0 markdown-content">
                      <p>{responseText}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-0.25">
                  <button
                    type="button"
                    className="focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 scale-75"
                  >
                    <LucideCopy />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 md:p-4 border-t dark:border-zinc-700">
            <div className="flex-shrink-0 gap-2">
              <div className="flex flex-col flex-grow gap-1 mb-4">
                <div className="flex flex-row bg-slate-50 dark:bg-zinc-700 rounded-2xl p-2 border items-center">
                  <div className="flex justify-end space-x-2">
                    <button className="focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm w-10 h-10 rounded-full p-0">
                      <LucidePaperclip />
                    </button>
                  </div>
                  <div className="flex flex-grow items-center space-x-2 mb-2">
                    <div className="relative flex-grow">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ minHeight: 24, maxHeight: 200, height: 28 }}
                        className="text-base sm:text-sm w-full bg-transparent placeholder-gray-400 focus:outline-none resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent py-1 px-3"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="focus-visible:ring-ring items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 w-9 flex shrink-0 rounded-full transition-all duration-200"
                      >
                        <LucideMic />
                      </button>
                      <button
                        onClick={() => handleStream()}
                        type="button"
                        className="focus-visible:ring-ring cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 p-2 rounded-full flex-shrink-0"
                      >
                        <LucideSendHorizontal />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
