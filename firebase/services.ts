import { getAuth } from "firebase/auth";
import { app, db } from "./config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const auth = getAuth(app);

export const fetchNotes = async () => {
  try {
    const docRef = collection(db, "notes");
    const notes = await getDocs(docRef);
    if (!notes) {
      throw new Error("Failed to fetch notes");
    }
    return notes;
  } catch (error) {
    console.log(error);
  }
};

export const addNewNote = async (
  title: string,
  content: string,
  pinned: boolean
) => {
  try {
    const note = await addDoc(collection(db, "notes"), {
      title: title,
      content: content,
      pinned: pinned,
      createdAt: Timestamp.now(),
      editedAt: Timestamp.now(),
    });
    if (!note) {
      throw new Error("Failed to add note");
    }
    return note.id;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    const docRef = doc(db, "notes", noteId);
    if (!docRef) {
      throw new Error("Failed to delete note");
    }
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};

export const updateNoteTogglePin = async (noteId: string, pinned: boolean) => {
  try {
    const docRef = doc(db, "notes", noteId);
    if (!docRef) {
      throw new Error("Failed to update note");
    }
    await updateDoc(docRef, { pinned: !pinned });
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (
  noteId: string,
  title: string,
  content: string,
  pinned: boolean
) => {
  try {
    const docRef = doc(db, "notes", noteId);
    if (!docRef) {
      throw new Error("Failed to update note");
    }
    await updateDoc(docRef, {
      title: title,
      content: content,
      pinned: pinned,
      editedAt: Timestamp.now(),
    });
    return {
      success: "Note updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update note",
    };
  }
};
