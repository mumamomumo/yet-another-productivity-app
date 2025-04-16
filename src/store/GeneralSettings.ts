import { create } from "zustand";
// Settings Type
export type GeneralSettings = {
  topClock: boolean;
  showDate: boolean;
  enableAI: boolean;
  font: string;
  clearEvents: boolean;
};
// Default settings
export const defaultSettings: GeneralSettings = {
  topClock: true,
  showDate: true,
  enableAI: true,
  font: "Arial",
  clearEvents: true,
};
// Store Type safety
type SettingsStore = {
  settings: GeneralSettings;
  setSettings: (settings: Partial<GeneralSettings>) => void;
  resetSettings: () => void;
};
// Store
export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: defaultSettings,
  setSettings: (settings) => {
    set((state) => ({ settings: { ...state.settings, ...settings } }));
  },
  resetSettings: () => set({ settings: defaultSettings }),
}));
