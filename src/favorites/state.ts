import { bind } from "@react-rxjs/core";
import { filter, from, map, of, startWith, switchMap } from "rxjs";
import { ObservableMutationResult } from "../lib/mutation";
import { Favorite } from "./model";
import { deleteFavorite, favorites$, postFavorite } from "./service";
import { manageFavorites$ } from "./signals";
import { assertNever } from "../lib/assertNever";

const [useFavorites, sharedFavorites$] = bind<Favorite[]>(
  favorites$.pipe(startWith([]))
);

const [useFindFavoriteId] = bind((recipeId: number) =>
  sharedFavorites$.pipe(
    map(
      (favorites) =>
        favorites.find((candidate) => candidate.recipeId === recipeId)?.id
    )
  )
);

const [useManageFavoritesResult] = bind(
  (correlationId: string): ObservableMutationResult<string> =>
    manageFavorites$.pipe(
      filter((candidate) => candidate.payload.correlationId === correlationId),
      switchMap((request) => {
        switch (request.type) {
          case "reset$": {
            return of("Idle" as const);
          }
          case "add$": {
            return from(postFavorite(request.payload.data)).pipe(
              map((data) => ({ data })),
              startWith("Awaiting" as const)
            );
          }
          case "delete$": {
            return from(deleteFavorite(request.payload.data)).pipe(
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

export { useFavorites, useFindFavoriteId, useManageFavoritesResult };
