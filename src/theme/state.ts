import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { scan, startWith } from "rxjs";
import { defaultState, toggleThemeReducer } from "./model";

const [toggleTheme$, toggleTheme] = createSignal();

const [useTheme, theme$] = bind(
  toggleTheme$.pipe(
    scan(toggleThemeReducer, defaultState),
    startWith(defaultState)
  )
);

export { theme$, toggleTheme, useTheme };
