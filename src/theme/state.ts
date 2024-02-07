import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { scan, startWith } from "rxjs";

export type Theme = "light" | "dark";
const defaultState = "light" as Theme;

const [toggleTheme$, toggleTheme] = createSignal();

const [useTheme] = bind(
  toggleTheme$.pipe(
    scan(
      (currentTheme) => (currentTheme === "light" ? "dark" : "light"),
      defaultState
    ),
    startWith(defaultState)
  )
);

export { toggleTheme, useTheme };
