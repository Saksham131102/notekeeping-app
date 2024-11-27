"use client";

import { useCurrentPageContext } from "@/context/CurrentPageContext";
import { useNotesContext } from "@/context/NotesContext";
import React, { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { notes, setFilteredNotes } = useNotesContext();
  const { currentPage } = useCurrentPageContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(event.target.value);

    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
    const indexOfLastNote = currentPage * 6;
    const indexOfFirstNote = indexOfLastNote - 6;
    setFilteredNotes(filtered.slice(indexOfFirstNote, indexOfLastNote));
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full p-3 text-sm border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-300 font-poppins"
      />
    </div>
  );
};

export default SearchBar;
