import "./App.css";

// Data
import { loadTheme } from "./data/ThemeManager";
import { usePageStore } from "./store/PageStore";
import { useThemeStore } from "./store/ThemeStore";
import { LoadData } from "./data/DataManager";
import { savePageData } from "./data/PageData";

// Components
import Titlebar from "./components/ui/Titlebar";
import SidebarComponent from "./components/ui/Sidebar";
import Home from "./components/pages/Home";
import Notes from "./components/pages/Notes";
import Tasks from "./components/pages/TaskPage";
import Timer from "./components/Home/Timer";
import Info from "./components/pages/Info";

// Normal imports
import { useEffect, useState } from "react";
import {
  getCurrentWindow,
  LogicalPosition,
  LogicalSize,
} from "@tauri-apps/api/window";
import Settings from "./components/pages/Settings";
import { useSettingsStore } from "./store/GeneralSettings";
import Clock from "./components/Home/Clock";

const appWindow = getCurrentWindow();
var oldSize = appWindow.outerSize();
var oldPos = appWindow.outerPosition();

LoadData();
function App() {
  const [focusTimer, setFocusTimer] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const theme = useThemeStore((state) => state.theme);
  const page = usePageStore((state) => state.page);
  const pageProps = usePageStore((state) => state.pageProps);
  const { settings } = useSettingsStore();
  console.log(settings);

  // Focus timer TODO
  const handleStartFocus = async () => {
    appWindow.setAlwaysOnTop(true);
    appWindow.setPosition(new LogicalPosition(0, 0));
    await appWindow.setMinSize(new LogicalSize(200, 200));
    await appWindow.setSize(new LogicalSize(200, 200));
  };
  const handleEndFocus = async () => {
    appWindow.setSize(
      new LogicalSize((await oldSize).toLogical(await appWindow.scaleFactor()))
    );
    appWindow.setAlwaysOnTop(false);
    appWindow.setPosition(
      (await oldPos).toLogical(await appWindow.scaleFactor())
    );
    appWindow.setMinSize(new LogicalSize(800, 500));
  };
  useEffect(() => {
    if (focusTimer) {
      handleStartFocus();
    } else {
      handleEndFocus();
    }
  }, [focusTimer]);
  function handleKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "p") {
      setSettingsOpen(!settingsOpen);
    } else if (e.key === "Escape") {
      setSettingsOpen(false);
    }
  }

  useEffect(() => {
    addEventListener("keydown", handleKeyDown);
    return removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load selected theme
  useEffect(() => {
    loadTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  // Save page on page change
  useEffect(() => {
    savePageData();
  }, [page]);

  return (
    <div className="app h-screen w-screen">
      <Titlebar />

      {!focusTimer ? (
        <SidebarComponent
          setOpenSettings={setSettingsOpen}
          openSettings={settingsOpen}
        />
      ) : null}
      {settingsOpen ? <Settings setSettingsOpen={setSettingsOpen} /> : null}
      <main>
        {settings.topClock && !(page === "info") && (
          <div className="text-[15px] flex justify-center">
            <Clock className="fixed top-[3%]" hideDate={!settings.showDate} />
          </div>
        )}
        {focusTimer ? (
          <Timer setFocus={setFocusTimer} focusTimer={focusTimer} />
        ) : page === "home" ? (
          <>
            <Home setFocus={setFocusTimer} focusTimer={focusTimer} />
          </>
        ) : page === "notes" ? (
          <Notes props={pageProps} />
        ) : page === "tasks" ? (
          <Tasks {...pageProps} />
        ) : page === "info" ? (
          <Info setPage={usePageStore.getState().setPage} />
        ) : null}
      </main>
    </div>
  );
}
export default App;
