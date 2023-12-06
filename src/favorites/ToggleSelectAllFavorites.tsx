import { useIsFavoritesEmpty, useIsLoadingFavorites } from "./state.manage";
import {
  deselectAllFavorites,
  selectAllFavorites,
  useAreAllFavoritesSelected,
} from "./state.selection";

export const ToggleSelectAllFavorites = () => {
  const selected = useAreAllFavoritesSelected();
  const isLoading = useIsLoadingFavorites();
  const isFavoritesEmpty = useIsFavoritesEmpty();

  return (
    <input
      disabled={isLoading || isFavoritesEmpty}
      type="checkbox"
      checked={selected}
      onChange={(ev) => {
        const checked = ev.target.checked;

        if (checked) {
          selectAllFavorites();
        } else {
          deselectAllFavorites();
        }
      }}
    />
  );
};
