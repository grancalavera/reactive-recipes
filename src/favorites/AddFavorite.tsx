import { useId, useState } from "react";
import { Recipe } from "../recipes/model";
import { Favorite, createFavorite } from "./model";
import { addFavorite, resetFavoritesManager } from "./signals";
import { useManageFavoritesResult } from "./state";

export const AddFavorite = ({ recipe }: { recipe: Recipe }) => {
  const correlationId = useId();
  const result = useManageFavoritesResult(correlationId);
  const [currentFavorite, setCurrentFavorite] = useState<Favorite>();

  if (result === "Idle" || result === "Awaiting") {
    return (
      <button
        className="icon-button"
        disabled={result === "Awaiting"}
        onClick={() => {
          const data = createFavorite(recipe.id, recipe.name);
          setCurrentFavorite(data);
          addFavorite({ correlationId, data });
        }}
      >
        ☆
      </button>
    );
  }

  return (
    <section>
      <aside>
        <h4>
          "<strong>{currentFavorite?.recipeName}</strong>" added to Favorites
        </h4>
        <button
          onClick={() => {
            resetFavoritesManager(correlationId);
            setCurrentFavorite(undefined);
          }}
        >
          ok
        </button>
      </aside>
    </section>
  );
};
