import { RecipeCount } from "./RecipeCount";
import { RecipeList } from "./RecipeList";
import { RecipePagination } from "./RecipePagination";
import { RecipeSearch } from "./RecipeSearch";

export const Recipes = () => {
  return (
    <section>
      <h3>
        Recipes <RecipeCount />
      </h3>
      <RecipeSearch />
      <hr />
      <RecipeList />
      <hr />
      <RecipePagination />
    </section>
  );
};
