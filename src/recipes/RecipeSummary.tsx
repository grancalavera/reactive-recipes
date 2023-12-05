import { AddFavorite } from "../favorites/AddFavorite";
import { RemoveFavorite } from "../favorites/RemoveFavorite";
import { useFindFavoriteId } from "../favorites/state";
import { Recipe } from "./model";

export const RecipeSummary = ({ recipe }: { recipe: Recipe }) => {
  const maybeFavoriteId = useFindFavoriteId(recipe.id);

  return (
    <li key={recipe.id}>
      {maybeFavoriteId === undefined ? (
        <AddFavorite recipe={recipe} />
      ) : (
        <RemoveFavorite id={maybeFavoriteId} />
      )}
      {recipe.name}
    </li>
  );
};
