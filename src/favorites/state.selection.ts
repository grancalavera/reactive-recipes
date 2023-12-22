import { bind, state } from "@react-rxjs/core";
import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import { combineLatest, first, map, scan, startWith, switchMap } from "rxjs";
import { assertNever } from "../lib/assertNever";
import { favorites$ } from "./state.manage";
import * as model from "./state.model";

/**
 * In this module the public API members are exported "in situ", as close as possible to their definition.
 * This makes easier to know if a given definition belongs to the public API, but makes it harder to
 * know what is the public API as a whole.
 *
 * For an alternative approach see src/favorites/state.manage.ts
 */
const [select$, selectFavorite] = createSignal<string>();
export { selectFavorite };

const [deselect$, deselectFavorite] = createSignal<string>();
export { deselectFavorite };

const [bulkDeselect$, bulkDeselectFavorites] = createSignal<string[]>();
export { bulkDeselectFavorites };

const [deselectAll$, deselectAllFavorites] = createSignal();
export { deselectAllFavorites };

const [selectAll$, selectAllFavorites] = createSignal<void>();
export { selectAllFavorites };

const signal$ = mergeWithKey({
  select$,
  deselect$,
  bulkDeselect$,
  deselectAll$,
  selectAll$: selectAll$.pipe(
    switchMap(() => favorites$.pipe(first())),
    map((favorites) => favorites.map((x) => x.id))
  ),
});

const state$ = state(signal$).pipe(
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
        console.log("ok?");
        return new Set();
      }
      case "selectAll$": {
        return model.selectAllFavorites(selection, signal.payload);
      }
      default: {
        assertNever(signal);
      }
    }
  }, model.emptySelection),
  startWith(model.emptySelection)
);

export const [useIsFavoriteSelected] = bind((id: string) =>
  state$.pipe(map(model.isFavoriteSelected(id)))
);

const [useFavoriteSelection, selection$] = bind(
  state$.pipe(map((selection) => [...selection]))
);
export { useFavoriteSelection };

export const [useZombieFavoriteSelection] = bind(
  combineLatest([selection$, favorites$]).pipe(
    map(([selection, favorites]) =>
      model.zombieFavoritesSelection(selection, favorites)
    )
  )
);

export const [useAreAllFavoritesSelected] = bind(
  combineLatest([
    selection$.pipe(map((x) => x.length)),
    favorites$.pipe(map((x) => x.length)),
  ]).pipe(
    map(([selectionLength, favoritesLength]) =>
      model.areAllFavoriteSelected(selectionLength, favoritesLength)
    )
  )
);
