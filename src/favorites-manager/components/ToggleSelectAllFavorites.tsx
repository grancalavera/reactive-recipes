import {
  useIsFavoritesEmpty,
  useFavoritesRemovalInProgress,
} from "../../favorites/state";
import {
  deselectAllFavorites,
  selectAllFavorites,
  useAreAllFavoritesSelected,
} from "../state";

export const ToggleSelectAllFavorites = () => {
  const selected = useAreAllFavoritesSelected();
  const isLoading = useFavoritesRemovalInProgress();
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
