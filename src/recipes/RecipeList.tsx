import { RecipeSummary } from "./RecipeSummary";
import { useRecipeList } from "./state";

export const RecipeList = () => {
  const { results } = useRecipeList();

  return (
    <ul>
      {results.length === 0 ? (
        <>No Results</>
      ) : (
        results.map((recipe) => (
          <RecipeSummary key={recipe.id} recipe={recipe} />
        ))
      )}
    </ul>
  );
};
