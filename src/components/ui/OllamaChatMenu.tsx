import { sendAiMessage } from "@/data/OllamaChat";
import { useChatStore } from "@/store/ChatStore";

import {
  BotMessageSquare,
  Info,
  Trash,
  SendHorizonal,
  ArrowDownRight,
} from "lucide-react";
import { useState, useRef } from "react";
import { open } from "@tauri-apps/plugin-shell";
import { ask } from "@tauri-apps/plugin-dialog";

function ChatActions(props: {
  clearMessages: Function;
  sendMessage: Function;
}) {
  const handleClearMessages = async () => {
    const confirm = await ask("Are you sure you want to clear all messages?", {
      title: "Clear messages",
      kind: "warning",
    });

    if (confirm) {
      props.clearMessages();
    } else {
      return;
    }
  };

  return (
    <div className="chat-actions mx-1 flex flex-col">
      <div className="chat-actions-hover pb-2">
        <Trash onClick={() => handleClearMessages()} />
      </div>
      <SendHorizonal onClick={() => props.sendMessage()} />
    </div>
  );
}

export function OllamaChatMenu() {
  const [showChat, setShowChat] = useState(false);
  const { messages, addMessage, clearMessages } = useChatStore();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const openMistral = () => {
    open("https://ollama.com/library/mistral");
  };
  const openLlama = () => {
    open("https://ollama.com/download");
  };

  const sendMessage = async () => {
    if (inputRef.current) {
      addMessage({ role: "user", content: inputRef.current.value });
      inputRef.current.value = "";
      const response = await sendAiMessage();
      console.log(response);
    }
  };

  return (
    <>
      {!showChat ? (
        <div className="show-chat-button fixed bottom-4 right-4 p-2 flex flex-col justify-between">
          <BotMessageSquare onClick={() => setShowChat(true)} />
        </div>
      ) : null}
      {showChat ? (
        <div className="ai-chat fixed bottom-4 right-4 h-[92vh] w-[30vw] flex flex-col justify-between z-50">
          {/* Chat Info */}
          <div className="flex items-center gap-1 py-1 chat-info">
            <Info className="w-3 h-3" />
            <p className="text-[10px]">
              Requires{" "}
              <span
                onClick={openMistral}
                className="text-blue-400 cursor-pointer underline"
              >
                {" "}
                MistralAI
              </span>{" "}
              installed via{" "}
              <span
                onClick={openLlama}
                className="text-blue-400 cursor-pointer underline"
              >
                Ollama
              </span>
            </p>
          </div>
          {/* Chat Title */}
          <div className="chat-title flex items-center gap-1 py-1 justify-between">
            <ArrowDownRight
              onClick={() => setShowChat(false)}
              className="w-4 h-4 button rounded-md cursor-pointer"
            />
            <div className="flex-1 ">
              <h1 className="text-xl flex-1 text-center">Ollama AI</h1>
            </div>
            <div />
          </div>
          {/* Chat Messages */}
          <div className="overflow-y-scroll flex-1 p-2">
            {messages.map((message, index) => {
              return (
                <div
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  key={index}
                >
                  <div
                    className={`text-sm ${
                      message.role === "user"
                        ? "chat-user ml-14"
                        : "chat-bot mr-14"
                    } rounded-md my-2`}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center p-2">
            <textarea
              className="chat-input border border-gray-300 rounded-md p-2 text-wrap whitespace-break-word"
              ref={inputRef}
              placeholder="Ask me anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <ChatActions
              clearMessages={clearMessages}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
