import { bind } from "@react-rxjs/core";
import { filter, from, map, of, startWith, switchMap } from "rxjs";
import { ObservableMutationResult } from "../lib/mutation";
import { Favorite } from "./model";
import { deleteFavorite, favorites$, postFavorite } from "./service";
import { manageFavorites$ } from "./signals";
import { assertNever } from "../lib/assertNever";

export const [useFavorites] = bind<Favorite[]>(favorites$.pipe(startWith([])));

export const [useManageFavoritesResult] = bind(
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
