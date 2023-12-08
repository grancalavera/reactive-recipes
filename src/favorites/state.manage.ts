import { bind } from "@react-rxjs/core";
import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import { filter, from, map, merge, of, startWith, switchMap } from "rxjs";
import { assertNever } from "../lib/assertNever";
import { MutationRequest, ObservableMutationResult } from "../lib/mutation";
import { Recipe } from "../recipes/model";
import * as service from "./service";
import { Favorite } from "./service.model";

const [add$, addFavorite] = createSignal<MutationRequest<Recipe>>();
const [remove$, removeFavorite] = createSignal<MutationRequest<string>>();
const [bulkRemoveFavorites$, bulkRemoveFavorites] =
  createSignal<MutationRequest<string[]>>();
const [reset$, resetFavoritesResult] = createSignal<
  [string],
  MutationRequest<void>
>((correlationId) => ({ correlationId, data: undefined }));

const request$ = mergeWithKey({
  add$,
  reset$,
  remove$,
  bulkRemoveFavorites$,
});

const [useFavorites, favorites$] = bind<Favorite[]>(
  service.favorites$.pipe(startWith([]))
);

const [useFindFavoriteId] = bind((recipeId: number) =>
  favorites$.pipe(
    map(
      (favorites) =>
        favorites.find((candidate) => candidate.recipeId === recipeId)?.id
    )
  )
);

const [useFavoritesResult] = bind(
  (correlationId: string): ObservableMutationResult<string | string[]> =>
    request$.pipe(
      filter((candidate) => candidate.payload.correlationId === correlationId),
      switchMap((request) => {
        switch (request.type) {
          case "reset$": {
            return of("Idle" as const);
          }
          case "add$": {
            const recipe = request.payload.data;
            return from(service.postFavorite(recipe.id, recipe.name)).pipe(
              map((data) => ({ data })),
              startWith("Awaiting" as const)
            );
          }
          case "remove$": {
            return from(service.deleteFavorite(request.payload.data)).pipe(
              map((data) => ({ data })),
              startWith("Awaiting" as const)
            );
          }
          case "bulkRemoveFavorites$": {
            return from(service.bulkDeleteFavorites(request.payload.data)).pipe(
              map((data) => ({ data })),
              startWith("Awaiting" as const)
            );
          }
          default: {
            assertNever(request);
          }
        }
      }),
      startWith("Idle" as const)
    )
);

const [useIsLoadingFavorites, isLoadingFavorites$] = bind(
  merge(
    favorites$.pipe(map(() => false)),
    request$.pipe(map((signal$) => (signal$.type === "reset$" ? false : true)))
  ).pipe(startWith(false))
);

const [useIsFavoritesEmpty] = bind(
  favorites$.pipe(map((favorites) => favorites.length === 0))
);

export {
  addFavorite,
  bulkRemoveFavorites,
  favorites$,
  isLoadingFavorites$,
  removeFavorite,
  resetFavoritesResult,
  useFavorites,
  useFavoritesResult,
  useFindFavoriteId,
  useIsFavoritesEmpty,
  useIsLoadingFavorites,
};
