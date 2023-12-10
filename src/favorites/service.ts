import { Subject, concat, debounceTime, firstValueFrom, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { HttpError, httpErrorFromResponse } from "../lib/errors";
import { Favorite, createFavorite } from "./service.model";

const endpoint = "/api/favorites";
const invalidate$ = new Subject<void>();

const getFavorites$ = fromFetch(endpoint).pipe(
  switchMap(async (response) => {
    if (!response.ok) {
      throw httpErrorFromResponse(response);
    }
    const favorites = await response.json();

    // We create these objects in the client so is ok to "trust" they are correct
    return favorites as Favorite[];
  })
);

const favorites$ = concat(
  getFavorites$,
  invalidate$.pipe(
    debounceTime(500),
    switchMap(() => getFavorites$)
  )
);

const assertRecipeIdIsUnique = async (recipeId: number): Promise<void> => {
  const favorites = await firstValueFrom(getFavorites$);
  if (favorites.some((candidate) => candidate.recipeId === recipeId)) {
    throw new HttpError(
      400,
      `Favorite for recipeId=${recipeId} already exists.`
    );
  }
};

const postFavorite = async ({
  recipeId,
  recipeName,
}: Omit<Favorite, "id">): Promise<string> => {
  await assertRecipeIdIsUnique(recipeId);
  const favorite = createFavorite(recipeId, recipeName);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
  if (!response.ok) {
    throw httpErrorFromResponse(response);
  }
  invalidate$.next();
  return favorite.id;
};

const deleteFavorite = async (id: string): Promise<string> => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw httpErrorFromResponse(response);
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
