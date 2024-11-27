import React, { useEffect, useState } from "react";
import Note from "../Note/Note";
import { fetchNotes } from "@/firebase/services";
import { useNotesContext } from "@/context/NotesContext";
import { sortNotes } from "@/lib/utilFunction";
import { SlNotebook } from "react-icons/sl";
import Pagination from "@/Components/Pagination/Pagination";
import { useCurrentPageContext } from "@/context/CurrentPageContext";
import { useToast } from "@/hooks/use-toast";

const NotesList = () => {
  const { notes, setNotes, filteredNotes, setFilteredNotes } =
    useNotesContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { currentPage, setCurrentPage } = useCurrentPageContext();
  const totalPages = Math.ceil(notes.length / 6);

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const querySnapshot = await fetchNotes();
        if (querySnapshot) {
          const notesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            pinned: doc.data().pinned,
            editedAt: doc.data().editedAt.toDate(),
            createdAt: doc.data().createdAt.toDate(),
          }));
          const sortedNotes = sortNotes(notesList);
          setNotes(sortedNotes);
          const indexOfLastNote = currentPage * 6;
          const indexOfFirstNote = indexOfLastNote - 6;
          setFilteredNotes(
            sortedNotes.slice(indexOfFirstNote, indexOfLastNote)
          );
          // localStorage.setItem("notes", JSON.stringify(notesList));
        }
      } catch (error: any) {
        console.error("Error fetching notes:", error);
        toast({
          variant: "destructive",
          title: "Error in fetching notes",
          description: `Something went wrong, ${error}`,
        });
      } finally {
        setLoading(false);
      }
    };
    getNotes();
  }, [setNotes, setFilteredNotes]);

  useEffect(() => {
    const indexOfLastNote = currentPage * 6;
    const indexOfFirstNote = indexOfLastNote - 6;
    setFilteredNotes(notes.slice(indexOfFirstNote, indexOfLastNote));
  }, [currentPage]);

  // const getNextNotes = async () => {
  //   const querySnapshot = await fetchNextNotes(lastVisible, notesPerPage);
  //   if (querySnapshot) {
  //     const notesList = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       title: doc.data().title,
  //       content: doc.data().content,
  //       pinned: doc.data().pinned,
  //       editedAt: doc.data().editedAt.toDate(),
  //       createdAt: doc.data().createdAt.toDate(),
  //     }));
  //     const sortedNotes = sortNotes(notesList);
  //     setLastVisible(sortedNotes[sortedNotes.length - 1]);
  //     setNotes((prevNotes) => [...prevNotes, ...sortedNotes]);
  //     setFilteredNotes((prevNotes) => [...prevNotes, ...sortedNotes]);
  //     // localStorage.setItem("notes", JSON.stringify(notesList));
  //   }
  // };

  return (
    <>
      {loading ? (
        <p className="w-full flex justify-center mt-20 text-xl font-medium font-poppins">
          Loading...
        </p>
      ) : filteredNotes.length === 0 ? (
        <p className="w-full flex flex-col gap-3 items-center mt-20 text-xl font-medium font-poppins text-gray-400">
          <span className="text-[200px]">
            {/* <GiNotebook /> */}
            <SlNotebook />
          </span>
          <span className="text-base">Organize your notes here</span>
        </p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 font-poppins">
            {filteredNotes.map((note) => (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                pinned={note.pinned}
                createdAt={note.createdAt}
                editedAt={note.editedAt}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </>
  );
};

export default NotesList;
