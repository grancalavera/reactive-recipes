import { LoadingAnimation } from "../components/LoadingAnimation";
import { useIsLoadingRecipes } from "./state";

export const RecipeLoader = () => {
  const isLoading = useIsLoadingRecipes();
  return isLoading ? <LoadingAnimation /> : null;
};
