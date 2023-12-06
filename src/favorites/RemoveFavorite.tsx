import { useId } from "react";
import { removeFavorite, useFavoritesResult } from "./state.manage";

export const RemoveFavorite = ({ id }: { id: string }) => {
  const correlationId = useId();
  const result = useFavoritesResult(correlationId);

  return (
    <button
      className="icon-button"
      disabled={result === "Awaiting"}
      onClick={() => removeFavorite({ correlationId, data: id })}
    >
      ★
    </button>
  );
};
