import { nanoid } from "nanoid";
import { useId, useState } from "react";
import { Favorite, createFavorite } from "./model";
import { addFavorite, resetAddFavorite } from "./signals";
import { useManageFavoritesResult } from "./state";

export const AddFavorite = () => {
  const correlationId = useId();
  const result = useManageFavoritesResult(correlationId);
  const [currentFav, setCurrentFav] = useState<Favorite>();

  if (result === "Idle") {
    return (
      <section>
        <aside>
          <button
            onClick={() => {
              const data = createFavorite(0, nanoid(4));
              setCurrentFav(data);
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
            Adding "{currentFav?.recipeName}" to favorites...
          </button>
        </aside>
      </section>
    );
  }

  return (
    <section>
      <aside>
        <h4>
          "<strong>{currentFav?.recipeName}</strong>" added to Favorites
        </h4>
        <button
          onClick={() => {
            resetAddFavorite(correlationId);
            setCurrentFav(undefined);
          }}
        >
          ok
        </button>
      </aside>
    </section>
  );
};
