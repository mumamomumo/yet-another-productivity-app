import {
  useSettingsStore,
  GeneralSettings,
  defaultSettings,
} from "@/store/GeneralSettings";

export function saveSettingsLocal() {
  try {
    localStorage.setItem(
      "settings",
      JSON.stringify(useSettingsStore.getState().settings)
    );
  } catch (e) {
    console.error("failed to save: ", e);
  }
}

export function loadSettingsLocal() {
  try {
    const settings = localStorage.getItem("settings");
    if (settings) {
      useSettingsStore.setState({
        settings: JSON.parse(settings) as GeneralSettings,
      });
    } else {
      throw new Error("no settings found");
    }
  } catch (e) {
    console.error("failed to load: ", e);
    useSettingsStore.setState({
      settings: defaultSettings,
    });
    saveSettingsLocal();
  }
}
