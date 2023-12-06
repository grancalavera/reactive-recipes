import { useEffect } from "react";
import {
  bulkDeselectFavorites,
  useZombieFavoriteSelection,
} from "./state.selection";

export const FavoriteSelectionHousekeeper = () => {
  const zombies = useZombieFavoriteSelection();

  useEffect(() => {
    if (zombies.length) bulkDeselectFavorites(zombies);
  }, [zombies]);

  return null;
};
