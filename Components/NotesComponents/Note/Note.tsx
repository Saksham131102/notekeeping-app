import { Trash2 } from "lucide-react";
import { TiPin, TiPinOutline } from "react-icons/ti";
import React, { useState } from "react";
import {
  deleteNote,
  updateNote,
  updateNoteTogglePin,
} from "@/firebase/services";
import { useNotesContext } from "@/context/NotesContext";
import { INote } from "@/types";
import { formatDate, sortNotes } from "@/lib/utilFunction";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCurrentPageContext } from "@/context/CurrentPageContext";

const Note = ({ id, title, content, pinned, createdAt, editedAt }: INote) => {
  const [pinLoading, setPinLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { notes, setNotes, setFilteredNotes } = useNotesContext();
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedContent, setEditedContent] = useState<string>(content);
  const [editedPinned, setEditedPinned] = useState<boolean>(pinned);
  const { toast } = useToast();
  const { currentPage } = useCurrentPageContext();

  const handleDeleteNote = async () => {
    setDeleteLoading(true);
    try {
      await deleteNote(id);
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      const indexOfLastNote = currentPage * 6;
      const indexOfFirstNote = indexOfLastNote - 6;
      setFilteredNotes(
        updatedNotes
          .filter((note) => note.id !== id)
          .slice(indexOfFirstNote, indexOfLastNote)
      );
      localStorage.setItem(
        "notes",
        JSON.stringify(notes.filter((note) => note.id !== id))
      );
      return toast({
        title: "Note deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      return toast({
        variant: "destructive",
        title: "Error in deleting note",
        description: `Something went wrong, ${error}`,
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleTogglePin = async (pinned: boolean) => {
    setPinLoading(true);
    try {
      await updateNoteTogglePin(id, pinned);
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, pinned: !pinned } : note
      );
      setNotes(sortNotes(updatedNotes));
      const indexOfLastNote = currentPage * 6;
      const indexOfFirstNote = indexOfLastNote - 6;
      setFilteredNotes(
        sortNotes(updatedNotes).slice(indexOfFirstNote, indexOfLastNote)
      );
      localStorage.setItem("notes", JSON.stringify(sortNotes(updatedNotes)));
    } catch (error) {
      console.log(error);
      return toast({
        variant: "destructive",
        title: "Error in pinning note",
        description: `Something went wrong, ${error}`,
      });
    } finally {
      setPinLoading(false);
    }
  };

  const handleEditNote = async () => {
    if (
      editedTitle === title &&
      editedContent === content &&
      editedPinned === pinned
    ) {
      return;
    }
    if (
      editedTitle === title &&
      editedContent === content &&
      editedPinned !== pinned
    ) {
      await handleTogglePin(!editedPinned);
      return;
    }
    try {
      const status = await updateNote(
        id,
        editedTitle,
        editedContent,
        editedPinned
      );
      if (status.success) {
        const updatedNotes = notes.map((note) =>
          note.id === id
            ? {
                ...note,
                title: editedTitle,
                content: editedContent,
                pinned: editedPinned,
                editedAt: new Date(),
              }
            : note
        );
        setNotes(sortNotes(updatedNotes));
        setFilteredNotes(sortNotes(updatedNotes));
        localStorage.setItem("notes", JSON.stringify(sortNotes(updatedNotes)));
        return toast({
          title: `${status.success}`,
          variant: "success",
        });
      }
      if (status.error) {
        return toast({
          title: `${status.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      return toast({
        variant: "destructive",
        title: "Error in updating note",
        description: `Something went wrong, ${error}`,
      });
    }
  };

  const handleDialogClose = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setEditedPinned(pinned);
  };

  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <div className="flex relative flex-col justify-between h-64 p-4 bg-white border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 font-poppins">
          {/* Note Content */}
          <div className="overflow-hidden whitespace-pre-line text-gray-600 text-sm line-clamp-6 mr-3">
            {content}
          </div>
          {/* Title and Edited Date */}
          <div className="pt-4 border-t mt-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
              <p className="text-sm text-gray-400">
                {createdAt.getTime() === editedAt.getTime()
                  ? "Created At, "
                  : "Edited At, "}{" "}
                {formatDate(editedAt)}
              </p>
            </div>
            <button
              className="rounded-full hover:bg-gray-200 hover:bg-opacity-50 transition-colors duration-300 p-1"
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteNote();
              }}
            >
              {deleteLoading ? (
                <span>•••</span>
              ) : (
                <Trash2 className="text-red-500 text-2xl" />
              )}
            </button>
          </div>
          <div className="absolute top-2 right-2 cursor-pointer rounded-full p-1 hover:bg-gray-200 hover:bg-opacity-50 transition-colors duration-300">
            {/* <TiPinOutline className="text-gray-500 hover:text-gray-600 text-2xl transition-colors duration-300" /> */}
            {pinLoading ? (
              <span>•••</span>
            ) : pinned ? (
              <TiPin
                onClick={(event) => {
                  event.stopPropagation();
                  handleTogglePin(pinned);
                }}
                className="text-gray-500 text-2xl"
              />
            ) : (
              <TiPinOutline
                onClick={(event) => {
                  event.stopPropagation();
                  handleTogglePin(pinned);
                }}
                className="text-gray-500 text-2xl"
              />
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Note title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Write your note here..."
              className="min-h-[200px]"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          {editedPinned ? (
            <TiPin
              onClick={() => setEditedPinned(!editedPinned)}
              className="text-gray-500 hover:text-gray-600 text-2xl transition-colors duration-300 cursor-pointer"
            />
          ) : (
            <TiPinOutline
              onClick={() => setEditedPinned(!editedPinned)}
              className="text-gray-500 hover:text-gray-600 text-2xl transition-colors duration-300 cursor-pointer"
            />
          )}
          <div className="flex space-x-2">
            <div>
              <DialogClose
                className="border py-1 w-20 px-2 rounded-md hover:bg-gray-100 transition-all duration-300 font-medium"
                onClick={handleDialogClose}
              >
                Cancel
              </DialogClose>
            </div>
            <div>
              <DialogClose
                className="py-1 px-2 w-20 rounded-md text-white bg-gray-600 hover:bg-black  transition-all duration-300 font-medium"
                onClick={handleEditNote}
              >
                Edit
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Note;
