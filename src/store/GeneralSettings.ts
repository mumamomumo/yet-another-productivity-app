import { create } from "zustand";

export type GeneralSettings = {
  topClock: boolean;
  showDate: boolean;
  enableAI: boolean;
  font: string;
  clearEvents: boolean;
};

export const defaultSettings: GeneralSettings = {
  topClock: true,
  showDate: true,
  enableAI: true,
  font: "Arial",
  clearEvents: true,
};

type SettingsStore = {
  settings: GeneralSettings;
  setSettings: (settings: Partial<GeneralSettings>) => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: defaultSettings,
  setSettings: (settings) => {
    set((state) => ({ settings: { ...state.settings, ...settings } }));
  },
  resetSettings: () => set({ settings: defaultSettings }),
}));
