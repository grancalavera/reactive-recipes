import { Subject, concat, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { createFavorite } from "./service.model";

const endpoint = "/api/favorites";
const invalidate$ = new Subject<void>();

const fetchFavorites$ = fromFetch(endpoint).pipe(
  switchMap((result) => {
    if (!result.ok) {
      throw new Error(result.statusText);
    }
    return result.json();
  })
);

export const favorites$ = concat(
  fetchFavorites$,
  invalidate$.pipe(switchMap(() => fetchFavorites$))
);

export const postFavorite = async (
  recipeId: number,
  recipeName: string
): Promise<string> => {
  await wait(500);
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

export const deleteFavorite = async (id: string): Promise<string> => {
  await wait(500);
  const result = await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  invalidate$.next();
  return id;
};

export const bulkDeleteFavorites = async (
  batch: string[]
): Promise<string[]> => {
  await wait(500);
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

const wait = (howLong: number = 1000): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), howLong));
