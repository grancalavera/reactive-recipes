import { useIsLoadingRecipes, useLoader } from "./state";

export const RecipeLoader = () => {
  const isLoading = useIsLoadingRecipes();
  return isLoading ? <ShowLoader /> : null;
};

const ShowLoader = () => {
  const loader = useLoader();
  return <small>{loader}</small>;
};
