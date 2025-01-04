import { create } from "zustand";

export type GeneralSettings = {
  topClock: boolean;
  showDate?: boolean;
};

export const defaultSettings: GeneralSettings = {
  topClock: true,
  showDate: true,
};

type SettingsStore = {
  settings: Partial<GeneralSettings>;
  setSettings: (settings: Partial<GeneralSettings>) => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: defaultSettings,
  setSettings: (settings) =>
    set({ settings: { ...defaultSettings, ...settings } }),
  resetSettings: () => set({ settings: defaultSettings }),
}));
