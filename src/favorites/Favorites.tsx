import { FavoriteSelectionHousekeeper } from "./FavoriteSelectionHousekeeper";
import { FavoritesCount } from "./FavoritesCount";
import { FavoritesList } from "./FavoritesList";
import { FavoritesLoader } from "./FavoritesLoader";
import { RemoveFavoriteSelection } from "./RemoveFavoriteSelection";
import { ToggleSelectAllFavorites } from "./ToggleSelectAllFavorites";

export const Favorites = () => (
  <>
    <section style={{ position: "relative" }}>
      <h3>
        Favorites <FavoritesLoader />
      </h3>
      <div className="ribbon">
        <ToggleSelectAllFavorites />
        <RemoveFavoriteSelection />
        <FavoritesCount />
      </div>
      <hr />
      <FavoritesList />
      <hr />
    </section>
    <FavoriteSelectionHousekeeper />
  </>
);
