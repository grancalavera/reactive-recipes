import { useState } from "react";
import { searchRecipes } from "./signals";
import { useIsLoadingRecipes } from "./state";

export const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const isLoading = useIsLoadingRecipes();

  return (
    <div className="tools">
      <input
        placeholder="search"
        value={query}
        onChange={(ev) => setQuery(ev.target.value)}
      />{" "}
      <button
        className="icon-button"
        disabled={query === "" || isLoading}
        onClick={() => {
          searchRecipes(query);
        }}
      >
        ⏎
      </button>{" "}
      <button
        className="icon-button"
        disabled={query === "" || isLoading}
        onClick={() => {
          setQuery("");
          searchRecipes("");
        }}
      >
        ⤫
      </button>
    </div>
  );
};
