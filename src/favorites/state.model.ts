import { Favorite } from "./service.model";

export type FavoritesSelection = Record<string, boolean>;
export const emptySelection: FavoritesSelection = {};

export const selectFavorite = (
  selection: FavoritesSelection,
  id: string
): FavoritesSelection => ({
  ...selection,
  [id]: true,
});

export const deselectFavorite = (
  selection: FavoritesSelection,
  id: string
): FavoritesSelection => {
  const copy = { ...selection };
  delete copy[id];
  return copy;
};

export const bulkDeselectFavorites = (
  selection: FavoritesSelection,
  ids: string[]
): FavoritesSelection => {
  const copy = { ...selection };
  ids.forEach((id) => {
    delete copy[id];
  });
  return copy;
};

export const selectAllFavorites = (ids: string[]): FavoritesSelection =>
  Object.fromEntries(ids.map((key) => [key, true]));

export const isFavoriteSelected =
  (candidate: string) =>
  (selection: FavoritesSelection): boolean =>
    selection[candidate] ?? false;

export const isFavoritesSelectionEmpty = (selection: FavoritesSelection) =>
  Object.keys(selection).length === 0;

export const favoritesSelection = (selection: FavoritesSelection) =>
  Object.keys(selection);

export const zombieFavoritesSelection = (
  selection: string[],
  favorites: Favorite[]
) =>
  selection.filter(
    (candidate) => !favorites.some((favorite) => favorite.id === candidate)
  );

export const areAllFavoriteSelected = (
  selectionLength: number,
  favoritesLength: number
) => selectionLength > 0 && selectionLength === favoritesLength;
