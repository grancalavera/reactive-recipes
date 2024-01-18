import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { filter, first, lastValueFrom, map, startWith } from "rxjs";
import { useMutation } from "../lib/mutation";
import * as service from "./service";
import { Favorite } from "./model";

/**
 * In this module the public API is defined as a single `export` block at the top of the file. This
 * makes it easier to very quickly see what conforms the public API, but has the disadvantage of
 * making it harder to know if a given definition in the module belongs to the public API, you always
 * need to check in two places. Also it makes it slightly harder to rename API members in VSCode, since
 * a rename in the definition will not rename the exported definitions, so most of the times you'll need
 * to run two refactors as opposed to one.
 *
 * For an alternative approach see src/favorites/state.selection.ts
 */
export {
  favorites$,
  findFavoriteByRecipeId$,
  useAddFavorite,
  useBulkRemoveFavorites,
  useFavorites,
  useFavoritesRemovalInProgress as useFavoritesBatchInProgress,
  useFindFavoriteByRecipeId,
  useIsFavoriteById,
  useIsFavoriteRecipe,
  useIsFavoritesEmpty,
  useRemoveFavorite,
};

const [useFavorites, favorites$] = bind<Favorite[]>(
  service.favorites$.pipe(startWith([]))
);

const [useFindFavoriteByRecipeId, findFavoriteByRecipeId$] = bind(
  (recipeId: number) =>
    favorites$.pipe(
      map((favorites) => favorites.find((x) => x.recipeId === recipeId))
    )
);

const [useIsFavoriteRecipe] = bind((recipeId: number) =>
  findFavoriteByRecipeId$(recipeId).pipe(map(Boolean))
);

const [useIsFavoriteById] = bind((id: string) =>
  favorites$.pipe(map((favorites) => favorites.some((x) => x.id === id)))
);

const [useIsFavoritesEmpty] = bind(favorites$.pipe(map((x) => x.length === 0)));

const [favoritesRemovalInProgress$, toggleFavoritesRemovalInProgress] =
  createSignal<boolean>();

// Sometimes it might be required to perform side effects around a mutation. While it's possible to
// add specialized callbacks to the mutation constructor hook, a much simpler approach is to just
// wrap the mutation function itself into another function that performs any arbitrary side effects,
// while still retaining the same signature as the original function.
const bulkDeleteFavoritesWithSideEffects = async (
  batch: string[]
): Promise<string[]> => {
  // perform a side effect: show loader
  toggleFavoritesRemovalInProgress(true);

  // run the mutation and wait for the result
  const result = await service.bulkDeleteFavorites(batch);

  // perform a side effect: wait for the next favorites invalidation
  // in which the entire batch has been removed
  // see the difference between `lastValueFrom` and `firstValueFrom` here:
  // https://rxjs.dev/api/index/function/lastValueFrom
  // https://rxjs.dev/api/index/function/firstValueFrom
  await lastValueFrom(
    favorites$.pipe(
      filter((favorites) =>
        batch.every((id) => !favorites.some((x) => x.id === id))
      ),
      first()
    )
  );

  // perform a side effect: hide loader
  toggleFavoritesRemovalInProgress(false);

  // return the mutation result
  return result;
};

const useAddFavorite = () => useMutation(service.postFavorite);

const useRemoveFavorite = () => useMutation(service.deleteFavorite);

const useBulkRemoveFavorites = () =>
  useMutation(bulkDeleteFavoritesWithSideEffects);

const [useFavoritesRemovalInProgress] = bind(
  favoritesRemovalInProgress$.pipe(startWith(false))
);
