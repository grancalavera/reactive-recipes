import { bind } from "@react-rxjs/core";
import { scan, startWith, switchMap } from "rxjs";
import { defaultRequest } from "./model";
import { recipeList$ } from "./service";
import { manageRecipeList$ } from "./signals";
import { assertNever } from "../lib/assertNever";

const recipeListRequest$ = manageRecipeList$.pipe(
  scan((state, signal) => {
    switch (signal.type) {
      case "changePage$": {
        return { ...state, from: signal.payload ?? state.from };
      }
      case "searchRecipes$": {
        return { ...state, q: signal.payload, from: 0 };
      }
      default: {
        assertNever(signal);
      }
    }
  }, defaultRequest),
  startWith(defaultRequest)
);

export const [useRecipeList] = bind(
  recipeListRequest$.pipe(switchMap((request) => recipeList$(request)))
);
