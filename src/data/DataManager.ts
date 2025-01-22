import { savePageData, loadPageData } from "./PageData";
import { loadThemeLocal, saveThemeLocal } from "./ThemeManager";
import {
  saveTasks,
  loadTasks,
  saveEvents,
  loadEvents,
} from "./TasksAndEventsData";
import { saveTimerData, loadTimerData } from "./TimerData";
import { loadSettingsLocal, saveSettingsLocal } from "./SettingsData";
import { loadChatHistory, saveChatHistory } from "./OllamaChat";

export function SaveData() {
  savePageData();
  saveThemeLocal();
  saveTasks();
  saveEvents();
  saveTimerData();
  saveSettingsLocal();
  saveChatHistory();
}

export function LoadData() {
  loadPageData();
  loadThemeLocal();
  loadTasks();
  loadEvents();
  loadTimerData();
  loadSettingsLocal();
  loadChatHistory();
}
