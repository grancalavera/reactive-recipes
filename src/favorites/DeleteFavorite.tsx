import { useId } from "react";
import { useManageFavoritesResult } from "./state";
import { deleteFavorite } from "./signals";

export const DeleteFavorite = ({ id }: { id: string }) => {
  const correlationId = useId();
  const result = useManageFavoritesResult(correlationId);
  return (
    <button
      disabled={result === "Awaiting"}
      onClick={() => {
        deleteFavorite({ correlationId, data: id });
      }}
    >
      Delete
    </button>
  );
};
