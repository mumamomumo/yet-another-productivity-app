import "./App.css";

// Data
import { loadTheme, updateFont } from "./data/ThemeManager";
import { setPage, usePageStore } from "./store/PageStore";
import { useThemeStore } from "./store/ThemeStore";
import { useSettingsStore } from "./store/GeneralSettings";
import { LoadData } from "./data/DataManager";
import { savePageData } from "./data/PageData";
import { useTimerStore } from "./store/TimerStore";
import { saveSettingsLocal } from "@/data/SettingsData";

// Components
import Titlebar from "./components/ui/Titlebar";
import SidebarComponent from "./components/ui/Sidebar";
import Home from "./components/pages/Home";
import Notes from "./components/pages/Notes";
import Tasks from "./components/pages/TaskPage";
import Info from "./components/pages/Info";
import Settings from "./components/pages/Settings";
import Calendar from "./components/pages/Calendar";
import Clock from "./components/Home/Clock";
import { OllamaChatMenu } from "./components/ui/OllamaChatMenu";

// Normal imports
import { useEffect, useState } from "react";

LoadData();
function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { theme, themes } = useThemeStore();
  const page = usePageStore((state) => state.page);
  const pageProps = usePageStore((state) => state.pageProps);
  const { settings } = useSettingsStore();
  const { paused, pomodori, setPomodoriLeft, workTime, breakTime } =
    useTimerStore();

  // Keybinds
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (
        e.ctrlKey &&
        (e.key === "k" ||
          (e.key === "r" && !(process.env.NODE_ENV === "development")))
      ) {
        e.preventDefault();
      }

      if (e.altKey && e.key === "1") {
        setPage("home");
      }

      if (e.altKey && e.key === "2") {
        setPage("tasks");
      }
      if (e.altKey && e.key === "3") {
        setPage("notes");
      }
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        setSettingsOpen(true);
        console.log(settingsOpen);
      }
      if (e.key === "Escape") {
        setSettingsOpen(false);
      }
    });
  }, []);

  // Load selected theme
  useEffect(() => {
    if (themes.includes(theme)) {
      loadTheme(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  // Save page on page change
  useEffect(() => {
    savePageData();
  }, [page]);
  // Timer
  const handlePomodoroTimer = () => {
    useTimerStore.setState((state) => {
      const { timer, onBreak, pomodoriLeft } = state;
      if (timer <= 0) {
        if (pomodoriLeft <= 0)
          return { paused: true, onBreak: false, timer: 0 };
        if (onBreak) {
          return {
            timer: workTime * 60,
            onBreak: false,
          };
        } else {
          return {
            timer: breakTime * 60,
            onBreak: true,
            pomodoriLeft: pomodoriLeft - 1,
          };
        }
      }
      return { timer: timer - 1 };
    });
  };
  let interval: NodeJS.Timeout;
  useEffect(() => {
    if (!paused) {
      setPomodoriLeft(pomodori);
      interval = setInterval(handlePomodoroTimer, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [paused]);

  // Settings
  useEffect(() => {
    console.log("settings updated");
    saveSettingsLocal();
    updateFont(settings.font!);
  }, [settings]);
  return (
    <div className="app h-screen w-screen">
      <Titlebar />
      <SidebarComponent
        setOpenSettings={setSettingsOpen}
        openSettings={settingsOpen}
      />
      {settingsOpen ? <Settings setSettingsOpen={setSettingsOpen} /> : null}
      <main>
        {settings.enableAI && <OllamaChatMenu />}
        {settings.topClock && !(page === "info") && (
          <div className="text-[15px] flex justify-center">
            <Clock className="fixed top-[15px]" hideDate={!settings.showDate} />
          </div>
        )}
        {page === "home" ? (
          <Home />
        ) : page === "notes" ? (
          <Notes />
        ) : page === "tasks" ? (
          <Tasks {...pageProps} />
        ) : page === "info" ? (
          <Info setPage={usePageStore.getState().setPage} />
        ) : page === "calendar" ? (
          <Calendar />
        ) : null}
      </main>
    </div>
  );
}
export default App;
