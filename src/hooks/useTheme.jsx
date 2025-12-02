import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { LightTheme, DarkTheme } from "../styles/theme";
import { loadLocalStorage } from "../utils/loadLocalStorage";

const themeContext = createContext({
  theme: "light",
  handleTheme: () => {},
});

const loadTheme = () => {
  const theme = loadLocalStorage("theme");
  if (theme === null) return "light";
  return theme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(loadTheme());

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <themeContext.Provider value={{ theme, handleTheme }}>
      <StyledThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>{children}</StyledThemeProvider>
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(themeContext);
};
