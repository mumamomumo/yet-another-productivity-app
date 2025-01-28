import { Note } from "@/store/NotesStore";
import { Trash, Pin, PinOff } from "lucide-react";

function NoteSidebarItem(props: {
  note: Note;
  deleteNote: (note: Note) => void;
  setOpenNote: (noteId: string | null) => void;
  pinNote: (id: string) => void;
}) {
  const handleDeleteNote = () => {
    props.setOpenNote(null);
    props.deleteNote(props.note);
  };

  return (
    <div
      className={
        "note-side flex items-center justify-between gap-2 p-1 py-2 mb-3" +
        " " +
        (props.note.pinned ? "pinned" : "")
      }
    >
      <h2
        className={
          "note-side-title flex-1 pl-2" +
          " " +
          (props.note.unsaved ? "italic" : "")
        }
        onClick={() => props.setOpenNote(props.note.id)}
      >
        {props.note.title}
      </h2>
      <div className="flex gap-2">
        {props.note.pinned ? (
          <PinOff onClick={() => props.pinNote(props.note.id)} />
        ) : (
          <Pin onClick={() => props.pinNote(props.note.id)} />
        )}
        <Trash onClick={() => handleDeleteNote()} />
      </div>
    </div>
  );
}

export default NoteSidebarItem;
