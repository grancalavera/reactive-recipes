export type Theme = "light" | "dark";
export const defaultState: Theme = "light" as const;

export const toggleThemeReducer = (currentTheme: Theme) =>
  currentTheme === "light" ? "dark" : "light";
