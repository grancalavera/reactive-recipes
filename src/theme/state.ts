import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { scan, startWith } from "rxjs";
import { defaultState } from "./model";

const [toggleTheme$, toggleTheme] = createSignal();

const [useTheme, theme$] = bind(
  toggleTheme$.pipe(
    scan(
      (currentTheme) => (currentTheme === "light" ? "dark" : "light"),
      defaultState
    ),
    startWith(defaultState)
  )
);

export { toggleTheme, useTheme, theme$ };
