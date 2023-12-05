import { RemoveFavorite } from "./RemoveFavorite";
import { useFavorites } from "./state";

export const Favorites = () => {
  const favorites = useFavorites();
  return (
    <section>
      <h3>Favorites</h3>
      <div className="tools">
        <small>
          You have {favorites.length} recipe{favorites.length === 1 ? "" : "s"}{" "}
          in your Favorites
        </small>
      </div>
      <hr />
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <RemoveFavorite id={favorite.id} />
            {favorite.recipeName}
          </li>
        ))}
      </ul>
    </section>
  );
};
