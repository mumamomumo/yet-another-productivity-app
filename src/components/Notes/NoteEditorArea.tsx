import { Note, useNoteStore } from "@/store/NotesStore";
import { useEffect, useRef } from "react";
import { renameNote, saveNote } from "@/data/NotesData";
import { useSettingsStore } from "@/store/GeneralSettings";

function NoteEditor(props: {
  openNote: Note | undefined;
  setOpenNote: (noteId: string | null) => void;
}) {
  const { updateNote } = useNoteStore();
  const { topClock } = useSettingsStore().settings;
  const noteTitleRef = useRef<HTMLInputElement>(null);
  const noteContentRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.setOpenNote(null);
    }
    if (e.key === "s" && e.ctrlKey) {
      saveNote(props.openNote!.title, noteContentRef.current!.value);
      updateNote(props.openNote!.id, { unsaved: false });
    }
  };

  // Set note content
  useEffect(() => {
    if (props.openNote && noteTitleRef.current) {
      noteTitleRef.current.value = props.openNote.title;
      noteContentRef.current!.value = props.openNote.content;
      noteContentRef.current!.addEventListener("keydown", handleKeyDown);
    }
    return () => removeEventListener("keydown", handleKeyDown);
  }, [props.openNote]);

  if (!props.openNote) return <></>;
  else {
    // Update note content
    const updateNoteContent = (newContent: string) => {
      updateNote(props.openNote!.id, {
        content: newContent,
        unsaved: true,
      });
    };
    // Update note title
    const handleRenameNote = (id: string, title: string) => {
      renameNote(props.openNote!.title, title);
      updateNote(id, { title: title });
    };

    // Component thing
    return (
      <div className="note-editor-area p-2 h-full overflow-hidden flex flex-col items-center w-full">
        <input
          ref={noteTitleRef}
          type="text"
          maxLength={50}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRenameNote(props.openNote!.id, noteTitleRef.current!.value);
            }
          }}
          className={
            "note-editor-title max-w-[900px]" + " " + (topClock ? "mt-6" : "")
          }
          onBlur={(e) => handleRenameNote(props.openNote!.id, e.target.value)}
        />
        <textarea
          placeholder="Write your note here..."
          ref={noteContentRef}
          className=" my-3 h-[100%] p-5 max-w-[900px]"
          onChange={(e) => updateNoteContent(e.target.value)}
        />
      </div>
    );
  }
}

export default NoteEditor;
