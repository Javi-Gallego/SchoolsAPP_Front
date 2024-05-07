import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Chat {
  authorName: string;
  receiverName: string;
  messages: any[];
  unseenCount: number;
  setAuthorName: (newAuthorName: string) => void;
  setReceiverName: (newReceiverName: string) => void;
  setMessages: (newMessages: any[]) => void;
  setUnseenCount: (newUnseenCount: number) => void;
  deleteChat: () => void;
}

export const useChatStore = create<Chat>()(
  persist(
    (set) => ({
      authorName: "",
      receiverName: "",
      messages: [],
      unseenCount: 0,
      setAuthorName: (newAuthorName: string) =>
        set({ authorName: newAuthorName }),
      setReceiverName: (newReceiverName: string) =>
        set({ receiverName: newReceiverName }),
      setMessages: (newMessages: any[]) => set({ messages: newMessages }),
      setUnseenCount: (newUnseenCount: number) =>
        set({ unseenCount: newUnseenCount }),
      deleteChat: () =>
        set({
          authorName: "",
          receiverName: "",
          messages: [],
          unseenCount: 0,
        }),
    }),
    { name: "chat-storage" }
  )
);
