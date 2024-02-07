import { useEffect } from "react";
import { toggleTheme, useTheme } from "../state";

export const ThemeSelector = () => {
  const theme = useTheme();

  useEffect(() => {
    const [add, remove] =
      theme === "light" ? ["light", "dark"] : ["dark", "light"];
    document.body.classList.replace(remove, add);
  }, [theme]);

  return <button onClick={() => toggleTheme()}>{theme}</button>;
};
