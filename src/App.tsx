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
import Info from "./components/pages/Info";

// Normal imports
import { useEffect, useState } from "react";
import Settings from "./components/pages/Settings";
import { useSettingsStore } from "./store/GeneralSettings";
import Clock from "./components/Home/Clock";

LoadData();
function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { theme, themes } = useThemeStore();
  const page = usePageStore((state) => state.page);
  const pageProps = usePageStore((state) => state.pageProps);
  const { settings } = useSettingsStore();

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
    if (themes.includes(theme)) {
      loadTheme(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  // Save page on page change
  useEffect(() => {
    savePageData();
  }, [page]);

  return (
    <div className="app h-screen w-screen">
      <Titlebar />

      <SidebarComponent
        setOpenSettings={setSettingsOpen}
        openSettings={settingsOpen}
      />
      {settingsOpen ? <Settings setSettingsOpen={setSettingsOpen} /> : null}
      <main>
        {settings.topClock && !(page === "info") && (
          <div className="text-[15px] flex justify-center">
            <Clock className="fixed top-[3%]" hideDate={!settings.showDate} />
          </div>
        )}
        {page === "home" ? (
          <>
            <Home />
          </>
        ) : page === "notes" ? (
          <Notes />
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
