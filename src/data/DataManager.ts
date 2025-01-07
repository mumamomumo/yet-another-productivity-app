import { savePageData, loadPageData } from "./PageData";
import { loadThemeLocal, saveThemeLocal } from "./ThemeManager";
import { saveTasks, loadTasks } from "./TaskData";
import { saveTimerData, loadTimerData } from "./TimerData";
import { loadSettingsLocal, saveSettingsLocal } from "./SettingsData";
import { loadChatHistory, saveChatHistory } from "./OllamaChat";

export function SaveData() {
  savePageData();
  saveThemeLocal();
  saveTasks();
  saveTimerData();
  saveSettingsLocal();
  saveChatHistory();
}

export function LoadData() {
  loadPageData();
  loadThemeLocal();
  loadTasks();
  loadTimerData();
  loadSettingsLocal();
  loadChatHistory();
}
