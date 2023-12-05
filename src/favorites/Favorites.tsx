import { RemoveFavorite } from "./RemoveFavorite";
import { useFavorites } from "./state";

export const Favorites = () => {
  const favorites = useFavorites();
  return (
    <section>
      <aside>
        <h3>Favorites</h3>
        <small>
          You have {favorites.length} recipe{favorites.length === 1 ? "" : "s"}{" "}
          in your Favorites
        </small>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              {favorite.recipeName} <RemoveFavorite id={favorite.id} />
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};
