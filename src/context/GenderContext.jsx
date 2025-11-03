import { createContext, useContext, useState, useEffect } from "react";

export const GenderContext = createContext();

export const useGenderContext = () => useContext(GenderContext);

export const GenderContextProvider = ({ children }) => {
  const [Gender, setGender] = useState(
    JSON.parse(localStorage.getItem("Gender")) || "Boys"
  );

  // ✅ Sync with localStorage whenever Gender changes
  useEffect(() => {
    localStorage.setItem("Gender", JSON.stringify(Gender));
  }, [Gender]);

  return (
    <GenderContext.Provider value={{ Gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
};
