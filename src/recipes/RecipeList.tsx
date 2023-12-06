import { RecipeLoader } from "./RecipeLoader";
import { RecipeSummary } from "./RecipeSummary";
import { useIsLoadingRecipes, useRecipeList } from "./state";

export const RecipeList = () => {
  const { results } = useRecipeList();
  const isLoadingRecipes = useIsLoadingRecipes();

  if (results.length === 0 && isLoadingRecipes) {
    return <RecipeLoader />;
  }

  if (results.length === 0) {
    return <>No Results</>;
  }

  return (
    <ul>
      {results.map((recipe) => (
        <RecipeSummary key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
};
