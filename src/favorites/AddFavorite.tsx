import { useId, useState } from "react";
import { Recipe } from "../recipes/model";
import { Favorite, createFavorite } from "./model";
import { addFavorite, resetFavoritesManager } from "./signals";
import { useManageFavoritesResult } from "./state";

export const AddFavorite = ({ recipe }: { recipe: Recipe }) => {
  const correlationId = useId();
  const result = useManageFavoritesResult(correlationId);
  const [currentFavorite, setCurrentFavorite] = useState<Favorite>();

  if (result === "Idle") {
    return (
      <section>
        <aside>
          <button
            onClick={() => {
              const data = createFavorite(recipe.id, recipe.name);
              setCurrentFavorite(data);
              addFavorite({ correlationId, data });
            }}
          >
            Add Favorite
          </button>
        </aside>
      </section>
    );
  }

  if (result === "Awaiting") {
    return (
      <section>
        <aside>
          <button disabled>
            Adding "{currentFavorite?.recipeName}" to favorites...
          </button>
        </aside>
      </section>
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
