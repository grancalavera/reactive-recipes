import { useId } from "react";
import { Recipe } from "../recipes/model";
import { addFavorite, useFavoritesResult } from "./state.manage";

export const AddFavorite = ({ recipe }: { recipe: Recipe }) => {
  const correlationId = useId();
  const result = useFavoritesResult(correlationId);

  return (
    <button
      className="icon-button"
      disabled={result !== "Idle"}
      onClick={() => addFavorite({ correlationId, data: recipe })}
    >
      ☆
    </button>
  );
};
