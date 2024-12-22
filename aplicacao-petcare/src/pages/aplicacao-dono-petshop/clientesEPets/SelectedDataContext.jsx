import React, { createContext, useState, useContext } from "react";

const SelectedDataContext = createContext();

export const SelectedDataProvider = ({ children }) => {
  const [selectedData, setSelectedData] = useState([]);

  return (
    <SelectedDataContext.Provider value={{ selectedData, setSelectedData }}>
      {children}
    </SelectedDataContext.Provider>
  );
};

export const useSelectedData = () => useContext(SelectedDataContext);