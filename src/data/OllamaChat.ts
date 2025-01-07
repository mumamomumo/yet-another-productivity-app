import ollama from "ollama/browser";
import { Message, useChatStore } from "@/store/ChatStore";

export async function sendAiMessage() {
  try {
    const messages = useChatStore
      .getState()
      .messages.map((message, index, list) => {
        if (index === list.length - 1) {
          return {
            role: message.role,
            content:
              message.content +
              " <- Reply in as few words as possible, but kindly",
          };
        } else {
          return message;
        }
      });
    const response = await ollama.chat({
      model: "mistral",
      messages: messages,
    });
    useChatStore
      .getState()
      .addMessage({ role: "bot", content: response.message.content });
    saveChatHistory();
    return response.message.content;
  } catch (e) {
    return e;
  }
}

export function saveChatHistory() {
  try {
    localStorage.setItem(
      "chat-history",
      JSON.stringify(useChatStore.getState().messages)
    );
  } catch (e) {
    console.error("failed to save: ", e);
  }
}

export function loadChatHistory() {
  try {
    const history = localStorage.getItem("chat-history");
    if (history) {
      useChatStore.setState({ messages: JSON.parse(history) as Message[] });
    }
  } catch (e) {
    console.error("failed to load: ", e);
  }
}
