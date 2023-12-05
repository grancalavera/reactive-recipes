import { useId } from "react";
import { deleteFavorite } from "./signals";
import { useManageFavoritesResult } from "./state";

export const RemoveFavorite = ({ id }: { id: string }) => {
  const correlationId = useId();
  const result = useManageFavoritesResult(correlationId);
  return (
    <button
      className="icon-button"
      disabled={result === "Awaiting"}
      onClick={() => {
        deleteFavorite({ correlationId, data: id });
      }}
    >
      ★
    </button>
  );
};
