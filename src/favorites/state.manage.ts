import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { firstValueFrom, map, merge, startWith } from "rxjs";
import { useMutation } from "../lib/mutation";
import * as service from "./service";
import { Favorite } from "./service.model";

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
  useFindFavoriteByRecipeId,
  useIsFavoriteById,
  useIsFavoriteRecipe,
  useIsFavoritesEmpty,
  useIsLoadingFavorites,
  useRemoveFavorite,
};

const [useFavorites, favorites$] = bind<Favorite[]>(
  service.favorites$.pipe(startWith([]))
);

const [useFindFavoriteByRecipeId, findFavoriteByRecipeId$] = bind(
  (recipeId: number) =>
    favorites$.pipe(
      map((favorites) => favorites.find((_) => _.recipeId === recipeId))
    )
);

const [useIsFavoriteRecipe] = bind((recipeId: number) =>
  findFavoriteByRecipeId$(recipeId).pipe(map(Boolean))
);

const [useIsFavoriteById] = bind((id: string) =>
  favorites$.pipe(map((favorites) => favorites.some((_) => _.id === id)))
);

const [useIsFavoritesEmpty] = bind(favorites$.pipe(map((_) => _.length === 0)));

const [isLoadingBulkOperation$, setLoadingBulkOperation] =
  createSignal<boolean>();

const useAddFavorite = () => useMutation(service.postFavorite);

const useRemoveFavorite = () => useMutation(service.deleteFavorite);

const useBulkRemoveFavorites = () =>
  useMutation(async (batch: string[]) => {
    setLoadingBulkOperation(true);

    // run the mutation
    const result = await service.bulkDeleteFavorites(batch);
    // then wait for the next favorites invalidation
    await firstValueFrom(favorites$);

    setLoadingBulkOperation(false);
    return result;
  });

const [useIsLoadingFavorites] = bind(
  merge(favorites$.pipe(map(() => false)), isLoadingBulkOperation$).pipe(
    startWith(false)
  )
);
