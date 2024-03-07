import { useEffect } from "react";
import { toggleTheme } from "../state";
import { useTheme } from "../model";

export const ThemeSelector = () => {
  const theme = useTheme();

  useEffect(() => {
    document.body.classList.remove(theme === "dark" ? "light" : "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return <button onClick={() => toggleTheme()}>{theme}</button>;
};
