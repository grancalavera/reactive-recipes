import { useEffect } from "react";
import { isIdle, isSuccess } from "../../lib/result";
import { useBulkRemoveFavorites } from "../../favorites/state";
import { useFavoriteSelection } from "../state";
import { toast } from "react-toastify";

export const RemoveFavoriteSelection = () => {
  const selection = useFavoriteSelection();
  const { mutate, result, reset } = useBulkRemoveFavorites();
  const isSelectionEmpty = selection.length === 0;
  const enabled = isIdle(result) && !isSelectionEmpty;

  useEffect(() => {
    if (isSuccess(result) && isSelectionEmpty) {
      const one = result.data.length === 1;
      toast.success(`${result.data.length} favorite${one ? "" : "s"} removed`, {
        position: "bottom-left",
      });
      reset();
    }
  }, [result, reset, isSelectionEmpty]);

  return (
    <button
      className="icon-button"
      disabled={!enabled}
      onClick={() => {
        mutate(selection);
      }}
    >
      🗑️
    </button>
  );
};
