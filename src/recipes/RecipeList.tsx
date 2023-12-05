import { RecipeSummary } from "./RecipeSummary";
import { SearchRecipes } from "./SearchRecipes";
import { changePage } from "./signals";
import { useRecipeList } from "./state";

export const RecipeList = () => {
  const { results, pagination } = useRecipeList();
  return (
    <section>
      <aside>
        <h3>Recipes</h3>
        <SearchRecipes />
        <ul>
          {results.map((recipe) => (
            <RecipeSummary key={recipe.id} recipe={recipe} />
          ))}
        </ul>
        <button
          disabled={!pagination.prevPage}
          onClick={() => changePage(pagination.prevPage)}
        >
          prev page
        </button>
        <button
          disabled={!pagination.nextPage}
          onClick={() => changePage(pagination.nextPage)}
        >
          next page
        </button>
      </aside>
    </section>
  );
};
