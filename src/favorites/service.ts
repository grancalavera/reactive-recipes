import { Subject, concat, defer, switchMap } from "rxjs";
import { Favorite } from "./model";
import { wait } from "../lib/wait";

export const getFavorites = async (): Promise<Favorite[]> => {
  const result = await fetch("/api/favorites");
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  return result.json();
};

export const postFavorite = async (favorite: Favorite): Promise<string> => {
  console.log("postFavorite", favorite);
  const result = await fetch("/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  await wait(); // simulate it takes time
  invalidate$.next();
  return favorite.id;
};

export const deleteFavorite = async (id: string): Promise<string> => {
  const result = await fetch(`/api/favorites/${id}`, {
    method: "DELETE",
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  await wait(); // simulate it takes time
  invalidate$.next();
  return id;
};

const invalidate$ = new Subject<void>();
const readFavorites$ = defer(() => getFavorites());

export const favorites$ = concat(
  readFavorites$,
  invalidate$.pipe(switchMap(() => readFavorites$))
);
