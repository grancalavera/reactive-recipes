import { LoadingAnimation } from "../components/LoadingAnimation";
import { useFavoritesBatchInProgress } from "./state.manage";

export const FavoritesBulkLoader = () => {
  const isLoading = useFavoritesBatchInProgress();
  return isLoading ? <LoadingAnimation /> : null;
};
