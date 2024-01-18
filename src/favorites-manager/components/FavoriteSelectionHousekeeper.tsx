import { useEffect } from "react";
import { bulkDeselectFavorites, useZombieFavoriteSelection } from "../state";

export const FavoriteSelectionHousekeeper = () => {
  const zombies = useZombieFavoriteSelection();

  useEffect(() => {
    if (zombies.length) bulkDeselectFavorites(zombies);
  }, [zombies]);

  return null;
};
