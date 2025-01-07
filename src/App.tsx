import "./App.css";

// Data
import { loadTheme } from "./data/ThemeManager";
import { setPage, usePageStore } from "./store/PageStore";
import { useThemeStore } from "./store/ThemeStore";
import { useSettingsStore } from "./store/GeneralSettings";
import { LoadData } from "./data/DataManager";
import { savePageData } from "./data/PageData";

// Components
import Titlebar from "./components/ui/Titlebar";
import SidebarComponent from "./components/ui/Sidebar";
import Home from "./components/pages/Home";
import Notes from "./components/pages/Notes";
import Tasks from "./components/pages/TaskPage";
import Info from "./components/pages/Info";
import Settings from "./components/pages/Settings";
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

  // Keybinds
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && (e.key === "k" || e.key === "r")) {
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
        e.preventDefault()
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
