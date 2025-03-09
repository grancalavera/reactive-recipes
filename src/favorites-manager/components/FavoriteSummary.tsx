import { RemoveFavorite } from "../../favorites/components/RemoveFavorite";
import { Favorite } from "../../favorites/model";
import {
  deselectFavorite,
  selectFavorite,
  useIsFavoriteSelected,
} from "../state";

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
      {favorite.recipeName} ({favorite.id})
    </>
  );
};
