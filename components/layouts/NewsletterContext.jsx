"use client";

import { createContext, useContext } from "react";

const NewsletterContext = createContext(null);

export const useNewsletter = () => {
  const value = useContext(NewsletterContext);
  if (!value) {
    throw new Error("useNewsletter must be used within <NewsletterProvider />");
  }
  return value;
};

export const NewsletterProvider = ({ value, children }) => {
  return (
    <NewsletterContext.Provider value={value}>
      {children}
    </NewsletterContext.Provider>
  );
};

