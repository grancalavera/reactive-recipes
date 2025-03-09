import { bind, state } from "@react-rxjs/core";
import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import { combineLatest, first, map, scan, startWith, switchMap } from "rxjs";
import { favorites$ } from "../favorites/state";
import { assertNever } from "../lib/assertNever";
import * as model from "./model";

/**
 * In this module the public API members are exported "in situ", as close as possible to their definition.
 * This makes easier to know if a given definition belongs to the public API, but makes it harder to
 * know what is the public API as a whole.
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
  clearZombies$: favorites$,
});

export const favoriteSelection$ = state(signal$).pipe(
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
        return new Set();
      }
      case "selectAll$": {
        return model.selectAllFavorites(selection, signal.payload);
      }
      case "clearZombies$": {
        const zombies = model.zombieFavoritesSelection(
          [...selection],
          signal.payload
        );

        return zombies.length
          ? model.bulkDeselectFavorites(selection, zombies)
          : selection;
      }
      default: {
        assertNever(signal);
      }
    }
  }, model.emptySelection),
  startWith(model.emptySelection)
);

export const [useIsFavoriteSelected] = bind((id: string) =>
  favoriteSelection$.pipe(map(model.isFavoriteSelected(id)))
);

const [useFavoriteSelection, selection$] = bind(
  favoriteSelection$.pipe(map((selection) => [...selection]))
);
export { useFavoriteSelection };

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
