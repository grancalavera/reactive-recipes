import { Favorite } from "./service.model";

export type Selection = Record<string, boolean>;
export const emptySelection: Selection = {};

export const selectFavorite = (
  selection: Selection,
  id: string
): Selection => ({
  ...selection,
  [id]: true,
});

export const deselectFavorite = (
  selection: Selection,
  id: string
): Selection => {
  const copy = { ...selection };
  delete copy[id];
  return copy;
};

export const bulkDeselectFavorites = (
  selection: Selection,
  ids: string[]
): Selection => {
  const copy = { ...selection };
  ids.forEach((id) => {
    delete copy[id];
  });
  return copy;
};

export const selectAllFavorites = (ids: string[]): Selection =>
  Object.fromEntries(ids.map((key) => [key, true]));

export const isFavoriteSelected =
  (candidate: string) =>
  (selection: Selection): boolean =>
    selection[candidate] ?? false;

export const isFavoritesSelectionEmpty = (selection: Selection) =>
  Object.keys(selection).length === 0;

export const favoritesSelection = (selection: Selection) =>
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
