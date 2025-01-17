import { create } from "zustand";

type HomeLayoutStore = {
  open: string[];
  setOpen: (open: string[]) => void;
};

export const useHomeLayoutStore = create<HomeLayoutStore>((set) => ({
  open: ["tasks", "timer", "notes"],
  setOpen: (open) => set({ open: open }),
}));
