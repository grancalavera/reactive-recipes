import { useId } from "react";
import { deleteFavorite } from "./signals";
import { useManageFavoritesResult } from "./state";

export const RemoveFavorite = ({ id }: { id: string }) => {
  const correlationId = useId();
  const result = useManageFavoritesResult(correlationId);
  return (
    <button
      disabled={result === "Awaiting"}
      onClick={() => {
        deleteFavorite({ correlationId, data: id });
      }}
    >
      Remove from favorites
    </button>
  );
};
