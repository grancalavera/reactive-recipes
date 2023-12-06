import { LoadingAnimation } from "../components/LoadingAnimation";
import { useIsLoadingFavorites } from "./state.manage";

export const FavoritesLoader = () => {
  const isLoading = useIsLoadingFavorites();
  return isLoading ? <LoadingAnimation /> : null;
};
