import { bind } from "@react-rxjs/core";
import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import { map, merge, scan, startWith, switchMap } from "rxjs";
import { assertNever } from "../lib/assertNever";
import { defaultRequest } from "./model";
import * as service from "./service";

const [changePage$, changeRecipesPage] = createSignal<number | undefined>();
const [search$, searchRecipes] = createSignal<string>();
const signal$ = mergeWithKey({ changePage$, search$ });

const request$ = signal$.pipe(
  scan((state, signal) => {
    switch (signal.type) {
      case "changePage$": {
        return { ...state, from: signal.payload ?? state.from };
      }
      case "search$": {
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
  request$.pipe(switchMap(service.recipeList$))
);

const [useIsLoadingRecipes] = bind(
  merge(recipes$.pipe(map(() => false)), request$.pipe(map(() => true)))
);

export { changeRecipesPage, searchRecipes, useIsLoadingRecipes, useRecipeList };
