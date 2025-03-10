import { ThemeSelector } from "../../theme/components/ThemeSelector";
import { RecipeCount } from "./RecipeCount";
import { RecipeList } from "./RecipeList";
import { RecipeLoader } from "./RecipeLoader";
import { RecipePagination } from "./RecipePagination";
import { RecipeSearch } from "./RecipeSearch";

export const Recipes = () => {
  return (
    <section>
      <h3>
        Recipes <RecipeCount /> <RecipeLoader /> <ThemeSelector />
      </h3>
      <RecipeSearch />
      <hr />
      <RecipeList />
      <hr />
      <RecipePagination />
    </section>
  );
};
