"use client";

import Navbar from "@/Components/Header/Navbar";
import Main from "@/Components/Main/Main";
import { Toaster } from "@/Components/ui/toaster";
import CurrentPageProvider from "@/context/CurrentPageContext";
import NotesContextProvider from "@/context/NotesContext";

export default function Home() {
  return (
    <NotesContextProvider>
      <CurrentPageProvider>
        <ThemeWrapper />
      </CurrentPageProvider>
    </NotesContextProvider>
  );
}

const ThemeWrapper = () => {
  return (
    <main className="py-4 px-2 md:px-10 lg:px-40 bg-gray-50 text-black h-screen relative transition-colors duration-300">
      <Navbar />
      <Main />
      {/* <Footer /> */}
      <Toaster />
    </main>
  );
};
