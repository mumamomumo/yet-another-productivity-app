import { open } from "@tauri-apps/plugin-dialog";
import {
  create,
  DirEntry,
  readDir,
  readTextFile,
  remove,
  rename,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { join, documentDir } from "@tauri-apps/api/path";
import { useNoteStore } from "@/store/NotesStore";

const documentDirectory = documentDir();

export async function getNotes(): Promise<string | null> {
  const notesDir = await open({
    directory: true,
    canCreateDirectories: true,
    filters: [{ extensions: [".md", ".txt"], name: "Markdown Files" }],
    multiple: false,
    title: "Select notes directory",
    defaultPath: await documentDirectory,
  });

  return notesDir;
}
export async function readNotesDir(
  dir: string | null
): Promise<DirEntry[] | null> {
  if (dir) {
    const notesDirFiles = await readDir(dir);
    const notes = notesDirFiles.filter(
      (value) => value.name.endsWith(".md") && value.isFile
    );
    return notes;
  } else {
    return null;
  }
}
export async function readNoteFile(note: DirEntry, path: string) {
  const noteData = await readTextFile(await join(path, note.name));
  return noteData;
}
export async function createNote(title: string) {
  create(await join(useNoteStore.getState().notesDir!, `${title}.md`));
}
export async function deleteNoteFile(note: string, path: string) {
  const noteFile = note + ".md";
  remove(await join(path, noteFile));
}
export async function renameNote(note: string, path: string, newName: string) {
  await rename(
    await join(path, `${note}.md`),
    await join(path, `${newName}.md`)
  );
}
export async function saveNote(title: string, path: string, content: string) {
  const noteFile = title + ".md";
  const notePath = await join(path, noteFile);
  const noteContent = `${content}`;

  writeTextFile(notePath, noteContent);
}
export function saveNotesDir() {
  localStorage.setItem("notesDir", useNoteStore.getState().notesDir!);
}
export function loadNotesDir() {
  const noteDir = localStorage.getItem("notesDir");
  if (noteDir !== "null") useNoteStore.getState().updateNoteDir(noteDir!);
  return null;
}
