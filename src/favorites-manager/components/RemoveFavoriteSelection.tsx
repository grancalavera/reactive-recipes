import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { bulkDeleteFavorites } from "../../favorites/state";
import { useFavoriteSelection } from "../state";

const useRemoveFavoriteSelection = (
  removeFavoriteSelection: (selection: string[]) => Promise<string[]>
) => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string[]>();

  const removeFavoriteSelectionRef = useRef((selection: string[]) => {
    startTransition(async () => {
      const result = await removeFavoriteSelection(selection);
      setResult(result);
    });
  });

  return [removeFavoriteSelectionRef.current, isPending, result] as const;
};

export const RemoveFavoriteSelection = () => {
  const selection = useFavoriteSelection();
  const isSelectionEmpty = selection.length === 0;

  const [handleRemoveFavoriteSelection, isPending] = useRemoveFavoriteSelection(
    async (sel: string[]) => {
      const result = await bulkDeleteFavorites(sel);
      const count = result.length;
      const one = count === 1;
      toast.success(`${count} favorite${one ? "" : "s"} removed`, {
        position: "bottom-left",
      });
      return result;
    }
  );

  return (
    <button
      className="icon-button"
      disabled={isPending || isSelectionEmpty}
      type="submit"
      onClick={() => handleRemoveFavoriteSelection(selection)}
    >
      🗑️
    </button>
  );
};
