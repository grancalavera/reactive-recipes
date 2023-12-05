import { Subject, concat, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { Favorite } from "./model";
import { wait } from "../lib/wait";

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

export const postFavorite = async (favorite: Favorite): Promise<string> => {
  await wait(500);
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
