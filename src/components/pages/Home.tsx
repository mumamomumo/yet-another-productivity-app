import TaskList from "../Tasks/TaskList";
import NotesSidebar from "../Notes/NotesSidebar";
import { useState } from "react";
import NoteEditor from "../Notes/NoteEditorArea";
import { useNoteStore } from "@/store/NotesStore";
import Timer from "../Home/Timer";

function Home() {
  const [openNote, setOpenNote] = useState<string | null>(null);
  const { notes } = useNoteStore();
  return (
    <div className="home page p-0 flex gap-2">
      {/* Task list */}
      <TaskList className="flex-1 panel" />
      <div className="flex-1 h-full">
        {/* Timer */}
        <div className="flex flex-col h-full justify-center p-1">
          <div className="home-timer panel py-5">
            <Timer />
          </div>
          <div />
        </div>
      </div>
      <div className="flex-1 panel">
        {/* Note Editor */}
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
    </div>
  );
}

export default Home;
