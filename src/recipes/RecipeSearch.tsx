import { useState } from "react";
import { useIsLoadingRecipes, searchRecipes } from "./state";

export const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const isLoading = useIsLoadingRecipes();

  return (
    <div className="ribbon">
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
