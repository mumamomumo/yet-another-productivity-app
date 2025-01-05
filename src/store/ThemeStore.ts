import { create } from "zustand";

const themes: Array<string> = [];
type ThemeStore = {
  theme: string;
  toggleTheme: (theme: string) => void;
  themes: string[];
  addTheme: (theme: string) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: themes[0],
  toggleTheme: (theme) => {
    set({ theme: theme });
  },
  themes: themes,
  addTheme: (theme) => {
    console.log(useThemeStore.getState().themes, theme);
    if (useThemeStore.getState().themes.includes(theme)) return;
    console.log("Adding theme", theme);
    set((state) => ({ themes: [...state.themes, theme] }));
  },
}));
