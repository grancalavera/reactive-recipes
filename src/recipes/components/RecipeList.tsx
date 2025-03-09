import { RecipeLoader } from "./RecipeLoader";
import { RecipeSummary } from "./RecipeSummary";
import { useIsLoadingRecipes, useRecipeList } from "../state";
import { Subscribe } from "@react-rxjs/core";

export const RecipeList = () => {
  const { results: recipes } = useRecipeList();
  const isLoadingRecipes = useIsLoadingRecipes();

  if (recipes.length === 0 && isLoadingRecipes) {
    return <RecipeLoader />;
  }

  if (recipes.length === 0) {
    return <>No Results.</>;
  }

  return (
    <ul>
      {recipes.map((recipe) => (
        <Subscribe key={recipe.id}>
          <RecipeSummary recipe={recipe} />
        </Subscribe>
      ))}
    </ul>
  );
};
