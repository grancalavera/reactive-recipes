import { useFavorites } from "./state.manage";

export const FavoritesCount = () => {
  const favorites = useFavorites();

  if (favorites.length === 0) {
    return <>You don't have favorite recipes.</>;
  }

  return (
    <small>
      You have {favorites.length} favorite recipe
      {favorites.length === 1 ? "" : "s"}.
    </small>
  );
};
