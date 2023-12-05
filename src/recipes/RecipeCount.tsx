import { useRecipeList } from "./state";

export const RecipeCount = () => {
  const count = useRecipeList().count;
  return <small>({count} results)</small>;
};
