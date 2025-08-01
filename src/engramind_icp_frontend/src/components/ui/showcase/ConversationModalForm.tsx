import {
  LucideMic,
  LucidePaperclip,
  LucideSendHorizontal,
  MonitorSpeaker,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  API_BASE_URL,
  API_KEY,
  API_REQUEST_FROM,
  OPEN_ROUTER_API_KEY,
} from "../../../utils/api";
import { RoleplayResponse } from "../../../interface";
import ChatLoading from "./ChatLoading";
import { UserMessage } from "./UserMessage";
import { AIMessage } from "./AIMessage";
import { AnimatePresence, motion } from "framer-motion";
import { backdrop, modal } from "../../../utils/uiHelper";

interface Props {
  isOpen: boolean;
  currentConversation: RoleplayResponse | null;
  conversationId: string;
  onClose: () => void;
}

export const ConversationModalForm = ({
  isOpen,
  currentConversation,
  conversationId,
  onClose,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [conversationMessages, setConversationMessages] = useState<any>([]);
  const [disableSubmitText, setDisableSubmitText] = useState(false);
  const disableSubmitButton = isLoading || !message || disableSubmitText;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const resetAll = () => {
    setMessage("");
    setConversationMessages([]);
    setResponseText("");
    setIsLoading(false);
  };

  const handleStream = async () => {
    try {
      setConversationMessages((prevState: any) => [
        ...prevState,
        { user: "person", message: message },
      ]);
      setMessage("");

      setIsLoading(true);
      setDisableSubmitText(true);
      setResponseText("");
      textareaRef?.current?.focus();
      let result = "";
      // --- REAL IMPLEMENTATION OF ELWYN CONVERSATIONS ---
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
      setIsLoading(false);
      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setResponseText(result);
      }

      result += decoder.decode();
      setDisableSubmitText(false);
      setResponseText("");
      setConversationMessages((prevState: any) => [
        ...prevState,
        { user: "bot", message: result },
      ]);

      // --- MOCK IMPLEMENTATION WITH OPEN ROUTER API ---
      // const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     model: "openai/gpt-3.5-turbo",
      //     stream: true,
      //     messages: [{ role: "user", content: message }],
      //   }),
      // });
      // setIsLoading(false);
      // const reader = res.body?.getReader();
      // if (!reader) {
      //   throw new Error("Response body is not readable");
      // }
      // const decoder = new TextDecoder();
      // let buffer = "";
      // try {
      //   while (true) {
      //     const { done, value } = await reader.read();
      //     if (done) break;
      //     buffer += decoder.decode(value, { stream: true });
      //     while (true) {
      //       const lineEnd = buffer.indexOf("\n");
      //       if (lineEnd === -1) break;
      //       const line = buffer.slice(0, lineEnd).trim();
      //       buffer = buffer.slice(lineEnd + 1);
      //       if (line.startsWith("data: ")) {
      //         const data = line.slice(6);
      //         if (data === "[DONE]") break;
      //         try {
      //           const parsed = JSON.parse(data);
      //           const content = parsed.choices[0].delta.content;
      //           if (content) {
      //             result += content;
      //             setResponseText(result);
      //           }
      //         } catch (e) {
      //           // Ignore invalid JSON
      //         }
      //       }
      //     }
      //   }
      // } finally {
      //   setResponseText("");
      //   setIsLoading(false);
      //   setDisableSubmitText(false);
      //   setConversationMessages((prevState: any) => [
      //     ...prevState,
      //     { user: "bot", message: result },
      //   ]);
      //   reader.cancel();
      // }
    } catch (e) {
      setDisableSubmitText(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages, isLoading, responseText]);

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") {
        resetAll();
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdrop}
          onClick={() => {
            resetAll();
            onClose();
          }}
        >
          <motion.div
            className="bg-transparent absolute top-1/2 left-1/2 w-full lg:w-[80%]"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto gap-4 border relative border-[#88888850] bg-[#FEFEFE] dark:bg-[#101213] pt-5 shadow-lg sm:rounded-lg md:w-full max-w-3xl h-[90vh] flex flex-col p-0">
              <button
                type="button"
                onClick={() => {
                  resetAll();
                  onClose();
                }}
                className="absolute cursor-pointer top-4 right-4 text-gray-500 dark:hover:text-white hover:text-black"
              >
                ✕
              </button>
              <div className="flex flex-col space-y-1.5 text-center sm:text-left px-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[10px]">
                  Conversation: {currentConversation?.name}
                </h2>
                <p className="text-[#627084]">
                  Interact with the character to get a feel for the scenario.
                  This conversation won't be saved or graded.
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-1 md:p-4">
                    <AIMessage element={<MonitorSpeaker />} />
                    {conversationMessages?.map(
                      (conversationMessage: any, index: number) =>
                        conversationMessage?.user === "person" ? (
                          <UserMessage
                            key={
                              conversationMessage?.message + index.toString()
                            }
                            message={conversationMessage?.message}
                          />
                        ) : (
                          <AIMessage
                            key={
                              conversationMessage?.message + index.toString()
                            }
                            message={conversationMessage?.message}
                          />
                        )
                    )}
                    {responseText && <AIMessage message={responseText} />}
                    {isLoading && <ChatLoading />}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-2 md:p-4 border-t border-[#88888850] dark:border-zinc-700">
                    <div className="flex-shrink-0 gap-2">
                      <div className="flex flex-col flex-grow gap-1 mb-4">
                        <div className="flex flex-row bg-slate-50 dark:bg-zinc-700 rounded-2xl p-2 border border-[#88888850] items-center">
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              disabled={isLoading}
                              className="focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-[#88888850] bg-white dark:bg-white hover:bg-accent hover:text-accent-foreground border shadow-sm w-10 h-10 rounded-full p-0"
                            >
                              <LucidePaperclip color="black" size={15} />
                            </button>
                          </div>
                          <div className="flex flex-grow items-center space-x-2 mb-2">
                            <div className="relative flex-grow">
                              <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{
                                  minHeight: 24,
                                  maxHeight: 200,
                                  height: 28,
                                }}
                                className="text-base sm:text-sm w-full bg-transparent placeholder-gray-400 focus:outline-none resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent py-1 px-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <div className="flex items-center gap-4">
                              <button
                                disabled={isLoading}
                                type="button"
                                className="focus-visible:ring-ring items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary-foreground hover:bg-primary/90 shadow h-9 w-9 flex shrink-0 rounded-full transition-all duration-200"
                              >
                                <LucideMic color="black" size={15} />
                              </button>
                              <button
                                disabled={disableSubmitButton}
                                onClick={() => handleStream()}
                                type="button"
                                className="focus-visible:ring-ring rounded-full cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary-foreground hover:bg-primary/90 shadow h-9 p-2 rounded-full flex-shrink-0"
                              >
                                <LucideSendHorizontal color="black" size={15} />
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
