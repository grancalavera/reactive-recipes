import { bind } from "@react-rxjs/core";
import { interval, map, merge, scan, startWith, switchMap } from "rxjs";
import { defaultRequest } from "./model";
import { recipeList$ } from "./service";
import { manageRecipeList$ } from "./signals";
import { assertNever } from "../lib/assertNever";

const loading = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
const loader$ = interval(200).pipe(
  map((i) => loading[(i + 1) % loading.length]),
  startWith("")
);

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

const [useRecipeList, recipes$] = bind(
  recipeListRequest$.pipe(switchMap((request) => recipeList$(request)))
);

const [useIsLoadingRecipes] = bind(
  merge(
    recipes$.pipe(map(() => false)),
    recipeListRequest$.pipe(map(() => true))
  )
);

const [useLoader] = bind(loader$);

export { useRecipeList, useIsLoadingRecipes, useLoader };
