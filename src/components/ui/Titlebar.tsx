import { SaveData } from "@/data/DataManager";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, Square, X } from "lucide-react";

const appWindow = getCurrentWindow();
appWindow.onCloseRequested(async () => {
  SaveData();
  console.log("saving");
  appWindow.destroy();
});

function Titlebar() {
  const handleClose = async () => {
    appWindow.close();
  };
  const handleMinimize = () => {
    appWindow.minimize();
  };

  const handleMaximize = () => {
    appWindow.toggleMaximize();
  };

  return (
    <>
      <header
        data-tauri-drag-region
        className="titlebar fixed top-0 w-full flex justify-between h-[25px]"
      >
        <h1 className="titlebar-title px-2 text-sm content-center" data-tauri-drag-region>App name</h1>
        <div className="titlebar-buttons flex h-[100%]">
          <button className="titlebar-button minimize" onClick={handleMinimize}>
            <Minus height={15} />
          </button>
          <button className="titlebar-button toggle" onClick={handleMaximize}>
            <Square height={15} />
          </button>
          <button className="titlebar-button close" onClick={handleClose}>
            <X height={18} fontWeight={"bold"} />
          </button>
        </div>
      </header>
    </>
  );
}

export default Titlebar;
