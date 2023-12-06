import { Subject, concat, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { Favorite, createFavorite } from "./service.model";

const endpoint = "/api/favorites";
const invalidate$ = new Subject<void>();

const getFavorites$ = fromFetch(endpoint).pipe(
  switchMap(async (result) => {
    if (!result.ok) {
      throw new Error(result.statusText);
    }
    const favorites = await result.json();

    // We create these objects in the client so is ok to "trust" they are correct
    return favorites as Favorite[];
  })
);

const favorites$ = concat(
  getFavorites$,
  invalidate$.pipe(switchMap(() => getFavorites$))
);

const postFavorite = async (
  recipeId: number,
  recipeName: string
): Promise<string> => {
  const favorite = createFavorite(recipeId, recipeName);
  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  invalidate$.next();
  return favorite.id;
};

const deleteFavorite = async (id: string): Promise<string> => {
  const result = await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  invalidate$.next();
  return id;
};

const bulkDeleteFavorites = async (batch: string[]): Promise<string[]> => {
  const uniqueBatch = [...new Set(batch)];

  const result = await Promise.allSettled(
    uniqueBatch.map((id) => deleteFavorite(id))
  );

  const reasons = result
    .filter(
      (candidate): candidate is PromiseRejectedResult =>
        candidate.status === "rejected"
    )
    .map((rejection) => rejection.reason);

  if (batch.length !== reasons.length) {
    // this means some deletions succeeded and some other failed
    // so we need to invalidate anyway, is up to the application
    // to recover from this error
    invalidate$.next();
  }

  if (reasons.length) {
    throw new Error(reasons.join(","));
  }

  return uniqueBatch;
};

export { bulkDeleteFavorites, deleteFavorite, favorites$, postFavorite };
