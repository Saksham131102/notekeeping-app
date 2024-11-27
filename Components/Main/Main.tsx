import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import NotesList from "../NotesComponents/NotesList/NotesList";

const Main = () => {
  return (
    <div className="w-full my-4">
      <SearchBar />
      <NotesList />
    </div>
  );
};

export default Main;
