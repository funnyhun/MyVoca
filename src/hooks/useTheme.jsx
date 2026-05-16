import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { LightTheme, DarkTheme } from "../styles/theme";
import { getStorageItem, setStorageItem, KEYS } from "../api/guest/storage";

const themeContext = createContext({
  theme: "light",
  handleTheme: () => {},
});

const loadTheme = () => {
  const theme = getStorageItem(KEYS.THEME);
  if (theme === null) return "light";
  return theme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(loadTheme());

  useEffect(() => {
    setStorageItem(KEYS.THEME, theme);
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
