import { FilePlus } from "lucide-react";

import {
  readNotesDir,
  readNoteFile,
  deleteNoteFile,
  createNote,
} from "@/data/NotesData";
import { Note, useNoteStore } from "@/store/NotesStore";
import NoteSidebarItem from "./NoteSidebarItem";

import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

// Notes Sidebar
function NotesSidebar(props: {
  className?: string;
  setOpenNote: (noteId: string | null) => void;
}) {
  const { notes, addNote, deleteNote, pinNote } = useNoteStore();
  // Reads notes on launch
  useEffect(() => {
    readNotesDir();
    readNotes();
  }, []);

  async function readNotes() {
    const savedNotes = await readNotesDir();
    savedNotes?.map(async (value) => {
      const noteData = await readNoteFile(value.name);
      const noteTitle = value.name.replace(".md", "");
      addNote({
        id: uuidv4(),
        title: noteTitle,
        content: noteData,
      });
    });
  }
  const handleDeleteNote = (note: Note) => {
    deleteNoteFile(note.title);
    deleteNote(note.id);
  };
  const handleCreateNote = async () => {
    const newNote = {
      id: uuidv4(),
      title:
        "New Note " +
        notes.filter((note) => note.title.match("New Note d*")).length,
      content: "",
    };
    addNote(newNote);
    await createNote(newNote.title);
    props.setOpenNote(newNote.id);
  };
  return (
    <div className="grid grid-rows-[50px_1fr] h-full gap-5">
      <div className="flex items-center justify-between min-h-[50px] panel px-3">
        <FilePlus
          onClick={handleCreateNote}
          width={30}
          height={30}
          className="cursor-pointer"
        />
        <h1 className="text-3xl">Notes</h1>
        <div className="w-[30px]" />
      </div>
      <div className="overflow-y-scroll px-2">
        {notes.map((note) => {
          return (
            <NoteSidebarItem
              key={note.id}
              note={note}
              deleteNote={handleDeleteNote}
              setOpenNote={props.setOpenNote}
              pinNote={pinNote}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NotesSidebar;
