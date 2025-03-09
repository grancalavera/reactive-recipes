import { bind, state } from "@react-rxjs/core";
import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import {
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  scan,
  startWith,
  switchMap,
} from "rxjs";
import { assertNever } from "../lib/assertNever";
import {
  changePage,
  clearSearch,
  defaultRequest,
  Page,
  RecipeListResponse,
  search,
} from "./model";
import * as service from "./service";

const isLoading = Symbol("isLoading");
type IsLoading = typeof isLoading;
type State = IsLoading | RecipeListResponse;

const [changePage$, changeRecipesPage] = createSignal<Page>();
const [search$, searchRecipes] = createSignal<string>();
const [clearSearch$, clearRecipesSearch] = createSignal();

const signal$ = mergeWithKey({ changePage$, search$, clearSearch$ });

const request$ = signal$.pipe(
  scan((state, signal) => {
    switch (signal.type) {
      case "changePage$": {
        return changePage(state, signal.payload);
      }
      case "search$": {
        return search(state, signal.payload);
      }
      case "clearSearch$": {
        return clearSearch(state);
      }
      default: {
        assertNever(signal);
      }
    }
  }, defaultRequest),
  startWith(defaultRequest),
  distinctUntilChanged()
);

export const response$: Observable<State> = state(
  request$.pipe(
    switchMap((request) =>
      service.recipeList$(request).pipe(startWith(isLoading))
    )
  )
);

const [useRecipeList, recipeList$] = bind<RecipeListResponse>(
  response$.pipe(filter((candidate) => candidate !== isLoading))
);

const [useIsLoadingRecipes] = bind(
  response$.pipe(map((candidate) => candidate === isLoading))
);

export {
  changeRecipesPage,
  clearRecipesSearch,
  recipeList$,
  searchRecipes,
  useIsLoadingRecipes,
  useRecipeList,
};
