import { LoadingAnimation } from "../../components/LoadingAnimation";
import { useFavoritesBatchInProgress } from "../../favorites/state";

export const FavoritesBulkLoader = () => {
  const isLoading = useFavoritesBatchInProgress();
  return isLoading ? (
    <small>
      <LoadingAnimation />
    </small>
  ) : null;
};
