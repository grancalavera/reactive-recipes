import { Favorite } from "./service.model";

export type FavoritesSelection = Set<string>;
export const emptySelection: FavoritesSelection = new Set();

export const selectFavorite = (
  selection: FavoritesSelection,
  id: string
): FavoritesSelection => selection.add(id);

export const deselectFavorite = (
  selection: FavoritesSelection,
  id: string
): FavoritesSelection => {
  selection.delete(id);
  return selection;
};

export const bulkDeselectFavorites = (
  selection: FavoritesSelection,
  ids: string[]
): FavoritesSelection => {
  ids.forEach((id) => selection.delete(id));
  return selection;
};

export const selectAllFavorites = (ids: string[]): FavoritesSelection =>
  new Set(ids);

export const isFavoriteSelected =
  (candidate: string) =>
  (selection: FavoritesSelection): boolean =>
    selection.has(candidate);

export const isFavoritesSelectionEmpty = (selection: FavoritesSelection) =>
  selection.size === 0;

export const favoritesSelection = (selection: FavoritesSelection) => [
  ...selection,
];

export const zombieFavoritesSelection = (
  selection: string[],
  favorites: Favorite[]
) => {
  return selection.filter(
    (candidate) => !favorites.some((favorite) => favorite.id === candidate)
  );
};

export const areAllFavoriteSelected = (
  selectionLength: number,
  favoritesLength: number
) => selectionLength > 0 && selectionLength === favoritesLength;
