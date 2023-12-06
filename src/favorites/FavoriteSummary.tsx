import { RemoveFavorite } from "./RemoveFavorite";
import { Favorite } from "./service.model";
import {
  deselectFavorite,
  selectFavorite,
  useIsFavoriteSelected,
} from "./state.selection";

export const FavoriteSummary = ({ favorite }: { favorite: Favorite }) => {
  const selected = useIsFavoriteSelected(favorite.id);

  return (
    <>
      <input
        type="checkbox"
        checked={selected}
        onChange={(ev) => {
          const checked = ev.target.checked;
          if (checked) {
            selectFavorite(favorite.id);
          } else {
            deselectFavorite(favorite.id);
          }
        }}
      />
      <RemoveFavorite id={favorite.id} />
      {favorite.recipeName}
    </>
  );
};
