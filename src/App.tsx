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

// Normal imports
import { useEffect, useState } from "react";
import {
  getCurrentWindow,
  LogicalPosition,
  LogicalSize,
  currentMonitor,
} from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();
var oldSize = appWindow.outerSize();
var oldPos = appWindow.outerPosition();

LoadData();
function App() {
  const [focusTimer, setFocusTimer] = useState(false);

  const theme = useThemeStore((state) => state.theme);
  const page = usePageStore((state) => state.page);
  const pageProps = usePageStore((state) => state.pageProps);

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
  };

  useEffect(() => {
    if (focusTimer) {
      handleStartFocus();
    } else {
      handleEndFocus();
    }
  }, [focusTimer]);

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
      {!focusTimer ? <SidebarComponent /> : null}
      <main>
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
        ) : null}
      </main>
    </div>
  );
}
export default App;
