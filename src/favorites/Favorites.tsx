import { FavoriteSelectionHousekeeper } from "./FavoriteSelectionHousekeeper";
import { RemoveFavoriteSelection } from "./RemoveFavoriteSelection";
import { FavoriteSummary } from "./FavoriteSummary";
import { FavoritesLoader } from "./FavoritesLoader";
import { ToggleSelectAllFavorites } from "./ToggleSelectAllFavorites";
import { useFavorites } from "./state.manage";

export const Favorites = () => {
  const favorites = useFavorites();

  return (
    <section>
      <h3>
        Favorites <FavoritesLoader />
      </h3>
      <div className="ribbon">
        <ToggleSelectAllFavorites />
        <RemoveFavoriteSelection />
        <FavoriteSelectionHousekeeper />
        <small>
          You have {favorites.length} recipe{favorites.length === 1 ? "" : "s"}{" "}
          in your Favorites
        </small>
      </div>
      <hr />

      {favorites.length ? (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <FavoriteSummary favorite={favorite} />
            </li>
          ))}
        </ul>
      ) : (
        <>No Favorites</>
      )}

      <hr />
    </section>
  );
};
