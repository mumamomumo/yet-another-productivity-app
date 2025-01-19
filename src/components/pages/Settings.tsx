import { getThemes, localAppDataDir } from "@/data/ThemeManager";
import { useThemeStore } from "@/store/ThemeStore";
import { open } from "@tauri-apps/plugin-dialog";
import { useSettingsStore } from "@/store/GeneralSettings";

import { X, FolderOpen, RotateCcw } from "lucide-react";

import DropdownMenu from "../ui/DropdownMenu";
import CustomCheckbox from "../ui/CustomCheckbox";
import { useEffect, useRef } from "react";

function Settings(props: { setSettingsOpen: Function }) {
  const { themes, toggleTheme, theme } = useThemeStore();
  const { settings, setSettings } = useSettingsStore();

  const fontRef = useRef<HTMLInputElement>(null);

  const handleOpenFolder = async () => {
    open({
      filters: [
        {
          extensions: ["css"],
          name: "CSS",
        },
      ],
      defaultPath: await localAppDataDir,
    });
  };
  const handleFontSubmit = () => {
    if (fontRef.current) {
      console.log("Font submit");
      setSettings({ ...settings, font: fontRef.current.value });
    }
  };
  useEffect(() => {
    if (fontRef.current) {
      fontRef.current.value = settings.font || "Arial";
    }
  }, []);
  return (
    <>
      <div className="settings-container w-screen h-screen z-40 backdrop-blur-[1px]" />
      <div className="settings-modal fixed backdrop-blur-[4px] top-[8vh] left-[10vw] w-[85vw] h-[84vh] border-2 rounded-md z-50 overflow-scroll">
        {/* Settings header */}
        <div className="settings-header flex items-center justify-between">
          <X
            className="w-8 h-8 cursor-pointer settings-close"
            onClick={() => props.setSettingsOpen(false)}
          />
          <h1 className="text-3xl text-center py-5">Settings</h1>
          <div />
        </div>
        <hr />
        {/* Settings */}
        {/* Color and font */}
        <div className="settings-font settings-item">
          <h2>App font</h2>
          <input
            className="exclude max-w-[150px] h-[30px] py-1 bg-[var(--input-bg)] rounded-md p-2 text-sm duration-100 transition-[colors] focus:border-2 focus:border-border focus:outline-none"
            ref={fontRef}
            onBlur={handleFontSubmit}
            onSubmit={handleFontSubmit}
            defaultValue={settings.font}
          />
        </div>
        <hr />
        {/* Theme */}
        <div className="settings-theme settings-item">
          <div className="flex items-center justify-between">
            <h2 className="col-span-1 col-start-1">Theme</h2>
            {theme === "light" ? (
              <p className="text-[8px]">
                {" "}
                I've never used light mode. I like to keep my retinas
              </p>
            ) : null}
          </div>
          <div className="theme-controls flex">
            <FolderOpen
              className="w-6 h-6 cursor-pointer theme-icon"
              onClick={handleOpenFolder}
            />
            <RotateCcw
              className="w-6 h-6 cursor-pointer theme-icon"
              onClick={getThemes}
            />
            <DropdownMenu
              values={themes}
              default={theme}
              setVar={toggleTheme}
              className="px-2 w-full min-w-min"
            />
          </div>
        </div>
        <hr />
        {/* Clock */}
        <div className="settings-clock settings-item">
          <h2 className="col-span-1 col-start-1">Enable Clock</h2>
          <div>
            <CustomCheckbox
              checked={settings.topClock!}
              onCheckChanged={(value) => {
                setSettings({ topClock: value, showDate: value });
              }}
            />
          </div>
        </div>
        {settings.topClock && (
          <div className="settings-clock settings-item">
            <li>Show Date</li>
            <div>
              <CustomCheckbox
                checked={settings.showDate || false}
                onCheckChanged={(value) => setSettings({ showDate: value })}
              />
            </div>
          </div>
        )}
        <hr />
        {/* Ai chat */}
        <div className="settings-clock settings-item">
          <h2 className="col-span-1 col-start-1">Enable AI Chat</h2>
          <div>
            <CustomCheckbox
              checked={settings.enableAI || false}
              onCheckChanged={(value) => setSettings({ enableAI: value })}
            />
          </div>
        </div>
        <hr />
        <p className="text-center text-[8px] py-2">More to come... hopefully</p>
      </div>
    </>
  );
}

export default Settings;
