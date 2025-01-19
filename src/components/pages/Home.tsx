//  Components
import TaskList from "../Tasks/TaskList";
import NotesSidebar from "../Notes/NotesSidebar";
import Timer from "../Home/Timer";
import NoteEditor from "../Notes/NoteEditorArea";

//  Hooks
import { useEffect, useState } from "react";
import { useNoteStore } from "@/store/NotesStore";
import { useHomeLayoutStore } from "@/store/HomeLayoutStore";

// Tauri
import { getCurrentWindow, PhysicalSize } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();
function Home() {
  const [openNote, setOpenNote] = useState<string | null>(null);
  const { notes } = useNoteStore();
  const { open } = useHomeLayoutStore();

  useEffect(() => {
    const minWidth = Math.max(300 * open.length + 100, 400);
    appWindow.setMinSize(new PhysicalSize(minWidth, 500));
  }, [open]);

  return (
    <div className="home page p-0 flex gap-2">
      {/* Task list */}
      {open.includes("tasks") && (
        <div className="flex-1 panel">
          <TaskList className="h-full w-full" />
        </div>
      )}
      {/* Timer */}
      {open.includes("timer") && (
        <div className="flex-1 h-full flex items-center justify-center">
          <div className={"home-timer panel py-5 overflow-y-scroll w-full"}>
            <Timer />
          </div>
        </div>
      )}
      {/* Note Editor */}
      {open.includes("notes") && (
        <div className="flex-1 panel">
          {openNote ? (
            <NoteEditor
              openNote={notes.find((item) => item.id == openNote)}
              setOpenNote={setOpenNote}
            />
          ) : (
            <NotesSidebar
              setOpenNote={setOpenNote}
              className=" p-2 h-full overflow-hidden"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
