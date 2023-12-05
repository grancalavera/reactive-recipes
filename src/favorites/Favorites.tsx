import { DeleteFavorite } from "./DeleteFavorite";
import { useFavorites } from "./state";

export const Favorites = () => {
  const favorites = useFavorites();
  return (
    <section>
      <aside>
        <small>
          You have {favorites.length} recipe{favorites.length === 1 ? "" : "s"}{" "}
          in your Favorites
        </small>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              {favorite.recipeName} <DeleteFavorite id={favorite.id} />
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};
