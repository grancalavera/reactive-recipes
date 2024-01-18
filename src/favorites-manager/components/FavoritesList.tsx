import { FavoriteSummary } from "./FavoriteSummary";
import { useFavorites } from "../../favorites/state";

export const FavoritesList = () => {
  const favorites = useFavorites();

  if (favorites.length === 0) {
    return <>No Favorites.</>;
  }

  return (
    <ul>
      {favorites.map((favorite) => (
        <li key={favorite.id}>
          <FavoriteSummary favorite={favorite} />
        </li>
      ))}
    </ul>
  );
};
