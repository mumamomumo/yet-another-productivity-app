import { savePageData, loadPageData } from "./PageData";
import { loadThemeLocal, saveThemeLocal } from "./ThemeManager";
import { saveTasks, loadTasks } from "./TaskData";
import { saveNotesDir, loadNotesDir } from "./NotesData";
import { saveTimerData, loadTimerData } from "./TimerData";

export function SaveData() {
  savePageData();
  saveThemeLocal();
  saveTasks();
  saveNotesDir();
  saveTimerData();
}

export function LoadData() {
  loadPageData();
  loadThemeLocal();
  loadTasks();
  loadNotesDir();
  loadTimerData();
}
