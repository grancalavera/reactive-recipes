import { LoadingAnimation } from "../../components/LoadingAnimation";
import { isLoading, isSuccess } from "../../lib/result";
import { Recipe } from "../../recipes/model";
import { useAddFavorite, useIsFavoriteRecipe } from "../state";

export const AddFavorite = ({ recipe }: { recipe: Recipe }) => {
  const { mutate, result } = useAddFavorite();
  const isFavorite = useIsFavoriteRecipe(recipe.id);
  const loading = isLoading(result) || (isSuccess(result) && !isFavorite);

  return (
    <button
      className="icon-button"
      data-testid="add-favorite-button"
      disabled={loading}
      onClick={() => mutate({ recipeId: recipe.id, recipeName: recipe.name })}
    >
      {loading ? <LoadingAnimation /> : "☆"}
    </button>
  );
};
