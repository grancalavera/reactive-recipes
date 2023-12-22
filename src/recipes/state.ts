import { bind, state } from "@react-rxjs/core";
import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import {
  distinctUntilChanged,
  map,
  merge,
  scan,
  startWith,
  switchMap,
} from "rxjs";
import { assertNever } from "../lib/assertNever";
import { defaultRequest } from "./model";
import * as service from "./service";

const [changePage$, changeRecipesPage] = createSignal<number | undefined>();
const [search$, searchRecipes] = createSignal<string>();
const [clearSearch$, clearRecipesSearch] = createSignal();

const request$ = state(
  mergeWithKey({ changePage$, search$, clearSearch$ }).pipe(
    scan((state, signal) => {
      switch (signal.type) {
        case "changePage$": {
          // return { ...state, from: signal.payload ?? state.from };
          return state;
        }
        case "search$": {
          return state.q === signal.payload
            ? state
            : { ...state, q: signal.payload, from: 0 };
        }
        case "clearSearch$": {
          return !state.q ? state : { ...state, q: undefined };
        }
        default: {
          assertNever(signal);
        }
      }
    }, defaultRequest),
    startWith(defaultRequest),
    distinctUntilChanged()
  )
);

const [useRecipeList, recipes$] = bind(
  request$.pipe(switchMap(service.recipeList$))
);

const [useIsLoadingRecipes] = bind(
  merge(recipes$.pipe(map(() => false)), request$.pipe(map(() => true)))
);

export {
  changeRecipesPage,
  clearRecipesSearch,
  searchRecipes,
  useIsLoadingRecipes,
  useRecipeList,
};
