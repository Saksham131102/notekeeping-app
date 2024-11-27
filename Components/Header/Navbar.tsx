import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNotesContext } from "@/context/NotesContext";
import { TiPinOutline } from "react-icons/ti";
import { TiPin } from "react-icons/ti";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { addNewNote } from "@/firebase/services";
import { sortNotes } from "@/lib/utilFunction";
import { useCurrentPageContext } from "@/context/CurrentPageContext";

const Navbar = () => {
  const { notes, setNotes, setFilteredNotes } = useNotesContext();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pinned, setPinned] = useState<boolean>(false);
  const { toast } = useToast();
  const { currentPage } = useCurrentPageContext();
  const indexofLastNote = currentPage * 6;
  const indexofFirstNote = indexofLastNote - 6;

  const handleAddNewNote = async () => {
    setLoading(true);
    try {
      setTitle("");
      setContent("");
      setPinned(false);
      if (!title || !content) {
        return toast({
          title: "Both title and content are required",
          variant: "destructive",
        });
      }
      const noteId = await addNewNote(title, content, pinned);
      if (noteId) {
        const updatedNotes = [
          {
            id: noteId,
            title,
            content,
            pinned,
            editedAt: new Date(),
            createdAt: new Date(),
          },
          ...notes,
        ];
        setNotes(sortNotes(updatedNotes));
        setFilteredNotes(
          sortNotes(updatedNotes).slice(indexofFirstNote, indexofLastNote)
        );
        localStorage.setItem(
          "notes",
          JSON.stringify([
            ...notes,
            { id: noteId, title, content, editedDate: new Date() },
          ])
        );
        return toast({
          title: "Note added successfully",
          variant: "success",
        });
      } else {
        throw new Error("Failed to add new note");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to add new note",
        description: `Something went wrong, ${error}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return;
  }

  return (
    <>
      <div className="flex justify-between items-center font-poppins">
        <h1 className="text-4xl font-medium text-gray-600 transition-colors duration-300">
          Notes
        </h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-600 transition-all duration-300">
                <Plus />
                <span>New Note</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Write your note here..."
                    className="min-h-[200px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                {pinned ? (
                  <TiPin
                    onClick={() => setPinned(!pinned)}
                    className="text-gray-500 hover:text-gray-600 text-2xl transition-colors duration-300 cursor-pointer"
                  />
                ) : (
                  <TiPinOutline
                    onClick={() => setPinned(!pinned)}
                    className="text-gray-500 hover:text-gray-600 text-2xl transition-colors duration-300 cursor-pointer"
                  />
                )}
                <div className="flex space-x-2">
                  <div>
                    <DialogClose className="border py-1 w-20 px-2 rounded-md hover:bg-gray-100 transition-all duration-300 font-medium">
                      Cancel
                    </DialogClose>
                  </div>
                  <div>
                    <DialogClose
                      className="py-1 px-2 w-20 rounded-md text-white bg-gray-600 hover:bg-black  transition-all duration-300 font-medium"
                      onClick={handleAddNewNote}
                    >
                      Create
                    </DialogClose>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Navbar;
