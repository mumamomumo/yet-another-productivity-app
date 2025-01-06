import {
  create,
  DirEntry,
  mkdir,
  readDir,
  readTextFile,
  remove,
  rename,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { join, appLocalDataDir } from "@tauri-apps/api/path";

const localAppData = appLocalDataDir();
const notesFolder = "notes";

export async function readNotesDir(): Promise<DirEntry[] | null> {
  try {
    const notesDirFiles = await readDir(
      await join(await localAppData, notesFolder)
    );
    const notes = notesDirFiles.filter(
      (value) => value.name.endsWith(".md") && value.isFile
    );
    return notes;
  } catch (e) {
    mkdir(await join(await localAppData, notesFolder));
    return readNotesDir();
  }
}
export async function readNoteFile(note: string) {
  const noteData = await readTextFile(
    await join(await localAppData, notesFolder, note)
  );
  return noteData;
}
export async function createNote(title: string) {
  try {
    create(await join(await localAppData, notesFolder, `${title}.md`));
  } catch (e) {
    console.error(e);
  }
}
export async function deleteNoteFile(note: string) {
  const noteFile = note + ".md";
  remove(await join(await localAppData, notesFolder, noteFile));
}
export async function renameNote(note: string, newName: string) {
  await rename(
    await join(await localAppData, notesFolder, `${note}.md`),
    await join(await localAppData, notesFolder, `${newName}.md`)
  );
}
export async function saveNote(title: string, content: string) {
  const noteFile = title + ".md";
  const notePath = await join(await localAppData, notesFolder, noteFile);
  const noteContent = `${content}`;

  writeTextFile(notePath, noteContent);
}
