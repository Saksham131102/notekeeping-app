import { createContext, useContext, useEffect, useState } from "react";

interface CurrentPageContextType {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const INITIAL_STATE = {
  currentPage: 1,
  setCurrentPage: () => {},
};

export const CurrentPageContext =
  createContext<CurrentPageContextType>(INITIAL_STATE);

const CurrentPageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<number>(
    INITIAL_STATE.currentPage
  );

  useEffect(() => {
    const currentPage = localStorage.getItem("currentPage");
    if (currentPage) {
      setCurrentPage(parseInt(currentPage));
    }
  }, []);
  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
};

export default CurrentPageProvider;

export const useCurrentPageContext = () => {
  return useContext(CurrentPageContext);
};
