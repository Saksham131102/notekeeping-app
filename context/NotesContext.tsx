import { INote } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface NotesContextType {
  notes: INote[];
  filteredNotes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  setFilteredNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

const INITIAL_STATE = {
  notes: [],
  filteredNotes: [],
  setNotes: () => {},
  setFilteredNotes: () => {},
};

export const NotesContext = createContext<NotesContextType>(INITIAL_STATE);

const NotesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<INote[]>(INITIAL_STATE.notes);
  const [filteredNotes, setFilteredNotes] = useState<INote[]>(
    INITIAL_STATE.filteredNotes
  );
  useEffect(() => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      const parsedNotes = JSON.parse(notes);
      const sortedNotes = parsedNotes.sort(
        (a: INote, b: INote) =>
          new Date(b.editedAt).getTime() - new Date(a.editedAt).getTime()
      );
      setNotes(sortedNotes);
      setFilteredNotes(sortedNotes);
    }
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, filteredNotes, setFilteredNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;

export const useNotesContext = () => {
  return useContext(NotesContext);
};
