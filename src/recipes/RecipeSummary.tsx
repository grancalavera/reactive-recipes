import { AddFavorite } from "../favorites/AddFavorite";
import { RemoveFavorite } from "../favorites/RemoveFavorite";
import { useFindFavoriteByRecipeId } from "../favorites/state.manage";
import { Recipe } from "./model";

export const RecipeSummary = ({ recipe }: { recipe: Recipe }) => {
  const maybeFavorite = useFindFavoriteByRecipeId(recipe.id);

  return (
    <li key={recipe.id}>
      {maybeFavorite ? (
        <RemoveFavorite id={maybeFavorite.id} />
      ) : (
        <AddFavorite recipe={recipe} />
      )}
      {recipe.name}
    </li>
  );
};
