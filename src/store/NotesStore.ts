import { create } from "zustand";

export type Note = {
  id: string;
  title: string;
  content: string;
  pinned?: boolean;
  unsaved?: boolean;
};

type NoteStore = {
  notes: Note[];
  notesDir: string | null;
  updateNoteDir: (dir: string) => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  pinNote: (id: string) => void;
};

function sortNotes(a: Note, b: Note) {
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
}

export const useNoteStore = create<NoteStore>((set) => {
  return {
    notes: [],
    notesDir: null,
    updateNoteDir: (dir: string) =>
      set((state) => {
        return { ...state, notesDir: dir };
      }),
    addNote: (note: Note) => {
      set((state) => {
        if (state.notes.find((value) => value.title === note.title))
          return { state };
        return {
          notes: [...state.notes, note].sort(sortNotes),
        };
      });
    },
    // Update note
    updateNote: (id: string, newNote: Partial<Note>) => {
      set((state) => {
        return {
          ...state,
          notes: state.notes
            .map((note) => (note.id === id ? { ...note, ...newNote } : note))
            .sort(sortNotes),
        };
      });
    },
    deleteNote: (id: string) => {
      set((state) => {
        return {
          ...state,
          notes: state.notes.filter((value) => value.id !== id),
        };
      });
    },
    pinNote: (id: string) => {
      set((state) => {
        return {
          ...state,
          notes: state.notes
            .map((note) =>
              note.id === id ? { ...note, pinned: !note.pinned } : note
            )
            .sort(sortNotes),
        };
      });
    },
  };
});
