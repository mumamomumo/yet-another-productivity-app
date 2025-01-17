import { getThemes, localAppDataDir } from "@/data/ThemeManager";
import { useThemeStore } from "@/store/ThemeStore";
import { open } from "@tauri-apps/plugin-dialog";
import { useSettingsStore } from "@/store/GeneralSettings";
import { saveSettingsLocal } from "@/data/SettingsData";

import { X, FolderOpen, RotateCcw } from "lucide-react";

import DropdownMenu from "../ui/DropdownMenu";
import CustomCheckbox from "../ui/CustomCheckbox";
import { useEffect } from "react";

function Settings(props: { setSettingsOpen: Function }) {
  const { themes, toggleTheme, theme } = useThemeStore();
  const { settings, setSettings } = useSettingsStore();

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

  useEffect(() => {
    saveSettingsLocal();
  }, [settings]);

  return (
    <>
      <div className="settings-container w-screen h-screen z-40 backdrop-blur-[1px]" />
      <div className="settings-modal fixed backdrop-blur-[4px] top-[8vh] left-[10vw] w-[85vw] h-[84vh] border-2 rounded-md z-50 overflow-scroll">
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
        <div className="settings-theme p-2 justify-between items-center">
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
        <div className="settings-clock flex justify-between items-center p-2">
          <h2 className="col-span-1 col-start-1">Enable Clock</h2>
          <div>
            <CustomCheckbox
              checked={settings.topClock!}
              onCheckChanged={(value) => setSettings({ topClock: value })}
            />
          </div>
        </div>
        {settings.topClock && (
          <div className="settings-clock flex justify-between items-center p-2">
            <li>Show Date</li>
            <div>
              <CustomCheckbox
                checked={settings.showDate!}
                onCheckChanged={(value) => setSettings({ showDate: value })}
              />
            </div>
          </div>
        )}
        <hr />
        <div className="settings-clock flex justify-between items-center p-2">
          <h2 className="col-span-1 col-start-1">Enable AI Chat</h2>
          <div>
            <CustomCheckbox
              checked={settings.topClock!}
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
