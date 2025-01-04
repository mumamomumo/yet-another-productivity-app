import { useState } from "react";
import NoteEditor from "../Notes/NoteEditorArea";
import NotesSidebar from "../Notes/NotesSidebar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../ui/Resizable";
import { useNoteStore } from "@/store/NotesStore";

function Notes(props: any) {
  const { notes } = useNoteStore();
  const [openNote, setOpenNote] = useState<string | null>(null);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="notes page w-full"
      autoSaveId="notes-panels"
    >
      <ResizablePanel
        className="left-notes panel"
        defaultSize={33}
        collapsedSize={0}
        collapsible={true}
        minSize={20}
      >
        {/* Notes Sidebar */}
        <NotesSidebar setOpenNote={setOpenNote} />
      </ResizablePanel>
      <ResizableHandle className="resize-handle w-2" />
      <ResizablePanel
        className="right-notes panel flex justify-center"
        defaultSize={67}
        minSize={40}
      >
        <div className="panel h-full w-full">
          {/* Note Editor */}
          <NoteEditor
            openNote={notes.find((item) => item.id == openNote)}
            setOpenNote={setOpenNote}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Notes;
