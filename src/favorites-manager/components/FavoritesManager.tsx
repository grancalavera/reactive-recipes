import { FavoriteSelectionHousekeeper } from "./FavoriteSelectionHousekeeper";
import { FavoriteSelectionStatus } from "./FavoriteSelectionStatus";
import { FavoritesBulkLoader } from "./FavoritesBulkLoader";
import { FavoritesCount } from "./FavoritesCount";
import { FavoritesList } from "./FavoritesList";
import { RemoveFavoriteSelection } from "./RemoveFavoriteSelection";
import { ToggleSelectAllFavorites } from "./ToggleSelectAllFavorites";

export const FavoritesManager = () => (
  <>
    <section style={{ position: "relative" }}>
      <h3>
        Favorites <FavoritesBulkLoader />
      </h3>
      <div className="ribbon">
        <ToggleSelectAllFavorites />
        <RemoveFavoriteSelection />
        <FavoritesCount />
      </div>
      <hr />
      <FavoritesList />
      <hr />
      <FavoriteSelectionStatus />
    </section>
    <FavoriteSelectionHousekeeper />
  </>
);
