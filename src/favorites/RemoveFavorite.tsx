import { LoadingAnimation } from "../components/LoadingAnimation";
import { isLoading, isSuccess } from "../lib/result";
import { useIsFavoriteById, useRemoveFavorite } from "./state.manage";

export const RemoveFavorite = ({ id }: { id: string }) => {
  const { result, mutate } = useRemoveFavorite();
  const isFavorite = useIsFavoriteById(id);
  const loading = isLoading(result) || (isSuccess(result) && isFavorite);

  return (
    <button
      className="icon-button"
      disabled={loading}
      onClick={() => mutate(id)}
    >
      {loading ? <LoadingAnimation /> : "★"}
    </button>
  );
};
