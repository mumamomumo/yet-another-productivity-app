import { create } from "zustand";

export type Message = {
  role: "user" | "bot"
  content: string
}

export type ChatStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message: Message) =>
    set({ messages: [...useChatStore.getState().messages, message] }),
  clearMessages: () => set({ messages: [] }),
}));
