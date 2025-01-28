import { SaveData } from "@/data/DataManager";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, X, Maximize2, Minimize2 } from "lucide-react";
import { useSettingsStore } from "@/store/GeneralSettings";
import Clock from "./Clock";
import { useState } from "react";

const appWindow = getCurrentWindow();
appWindow.onCloseRequested(async () => {
  SaveData();
  console.log("saving");
  appWindow.destroy();
});

function TitlebarMac() {
  const [maximized, setMaximized] = useState(false);
  const handleClose = async () => {
    appWindow.close();
  };
  const handleMinimize = () => {
    appWindow.minimize();
  };

  const handleMaximize = () => {
    appWindow.toggleMaximize();
    setMaximized((prev) => !prev);
  };

  const { settings } = useSettingsStore();

  return (
    <>
      <header
        data-tauri-drag-region
        className="titlebar fixed top-0 w-full flex justify-between h-[25px] items-center"
      >
        <div
          className="titlebar-buttons flex h-[100%] flex-1 justify-start"
          data-tauri-drag-region
        >
          <>
            <button
              className="titlebar-mac-button close exclude bg-red/50 hover:bg-red/100"
              onClick={handleClose}
            >
              <X height={18} fontWeight={"bold"} />
            </button>
            <button
              className="titlebar-mac-button minimize exclude"
              onClick={handleMinimize}
            >
              <Minus height={15} />
            </button>
            <button
              className="titlebar-button toggle exclude"
              onClick={handleMaximize}
            >
              {maximized ? (
                <div className="contents *:rotate-90">
                  <Minimize2 height={15} />
                </div>
              ) : (
                <div className="contents *:rotate-90">
                  <Maximize2 height={15} />
                </div>
              )}
            </button>
          </>
        </div>
        {settings.topClock && (
          <div
            className="flex-1 justify-items-center ml-[5%] "
            data-tauri-drag-region
          >
            <Clock
              hideDate={!settings.showDate}
              className="whitespace-nowrap text-ellipsis overflow-hidden"
            />
          </div>
        )}
        <h1
          className="titlebar-title px-2 text-sm text-end flex-1 whitespace-nowrap text-ellipsis overflow-hidden"
          data-tauri-drag-region
        >
          Yet another productivity app
        </h1>
      </header>
    </>
  );
}

export default TitlebarMac;
