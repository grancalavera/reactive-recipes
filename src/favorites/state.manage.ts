import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { map, merge, startWith } from "rxjs";
import { MutationOptions, useMutation } from "../lib/mutation";
import * as service from "./service";
import { Favorite } from "./service.model";

export {
  favorites$,
  findFavoriteByRecipeId$,
  useAddFavorite,
  useBulkRemoveFavorites,
  useFavorites,
  useFindFavoriteByRecipeId,
  useIsFavoriteRecipe,
  useIsFavoritesEmpty,
  useIsLoadingFavorites,
  useRemoveFavorite,
  useIsFavoriteById,
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

const [isLoading$, setLoading] = createSignal<boolean>();

const mutationOptions: MutationOptions = {
  onMutationStart: () => setLoading(true),
};

const useAddFavorite = () => useMutation(service.postFavorite, mutationOptions);

const useRemoveFavorite = () =>
  useMutation(service.deleteFavorite, mutationOptions);

const useBulkRemoveFavorites = () =>
  useMutation(service.bulkDeleteFavorites, mutationOptions);

const [useIsLoadingFavorites] = bind(
  merge(favorites$.pipe(map(() => false)), isLoading$).pipe(startWith(false))
);
