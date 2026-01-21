"use client";

import { createContext, useContext } from "react";

const ShowreelContext = createContext(null);

export const useShowreel = () => {
  const value = useContext(ShowreelContext);
  if (!value) {
    throw new Error("useShowreel must be used within <ShowreelProvider />");
  }
  return value;
};

export const ShowreelProvider = ({ value, children }) => {
  return (
    <ShowreelContext.Provider value={value}>{children}</ShowreelContext.Provider>
  );
};

