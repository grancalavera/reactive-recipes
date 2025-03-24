import { LoadingAnimation } from "../../components/LoadingAnimation";
import { useFavoritesRemovalInProgress } from "../../favorites/state";

export const FavoritesBulkLoader = () => {
  const isLoading = useFavoritesRemovalInProgress();
  return isLoading ? (
    <small>
      <LoadingAnimation />
    </small>
  ) : null;
};
