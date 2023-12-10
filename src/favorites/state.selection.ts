import { bind, state } from "@react-rxjs/core";
import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import {
  combineLatest,
  distinctUntilChanged,
  first,
  map,
  scan,
  startWith,
  switchMap,
} from "rxjs";
import { assertNever } from "../lib/assertNever";
import { favorites$ } from "./state.manage";
import * as model from "./state.model";

export {
  bulkDeselectFavorites,
  deselectAllFavorites,
  deselectFavorite,
  selectAllFavorites,
  selectFavorite,
  useAreAllFavoritesSelected,
  useFavoriteSelection,
  useIsFavoriteSelected,
  useZombieFavoriteSelection,
};

const [select$, selectFavorite] = createSignal<string>();
const [deselect$, deselectFavorite] = createSignal<string>();
const [bulkDeselect$, bulkDeselectFavorites] = createSignal<string[]>();
const [deselectAll$, deselectAllFavorites] = createSignal();
const [selectAll$, selectAllFavorites] = createSignal<void>();

const state$ = state(
  mergeWithKey({
    select$,
    deselect$,
    bulkDeselect$,
    deselectAll$,
    selectAll$: selectAll$.pipe(
      switchMap(() => favorites$.pipe(first())),
      map((favorites) => favorites.map((x) => x.id))
    ),
  }).pipe(
    scan((selection, signal) => {
      switch (signal.type) {
        case "select$": {
          return model.selectFavorite(selection, signal.payload);
        }
        case "deselect$": {
          return model.deselectFavorite(selection, signal.payload);
        }
        case "bulkDeselect$": {
          return model.bulkDeselectFavorites(selection, signal.payload);
        }
        case "deselectAll$": {
          return model.emptySelection;
        }
        case "selectAll$": {
          return model.selectAllFavorites(signal.payload);
        }
        default: {
          assertNever(signal);
        }
      }
    }, model.emptySelection),
    startWith(model.emptySelection)
  )
);

const [useIsFavoriteSelected] = bind((id: string) =>
  state$.pipe(map(model.isFavoriteSelected(id)))
);

const [useFavoriteSelection, selection$] = bind(
  state$.pipe(map(model.favoritesSelection))
);

const [useZombieFavoriteSelection] = bind(
  combineLatest([selection$, favorites$]).pipe(
    map(([selection, favorites]) =>
      model.zombieFavoritesSelection(selection, favorites)
    ),
    distinctUntilChanged(
      (previous, current) => previous.join("") === current.join("")
    )
  )
);

const [useAreAllFavoritesSelected] = bind(
  combineLatest([
    selection$.pipe(map((x) => x.length)),
    favorites$.pipe(map((x) => x.length)),
  ]).pipe(
    map(([selectionLength, favoritesLength]) =>
      model.areAllFavoriteSelected(selectionLength, favoritesLength)
    )
  )
);
