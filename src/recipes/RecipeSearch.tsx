import { useState } from "react";
import {
  useIsLoadingRecipes,
  searchRecipes,
  clearRecipesSearch,
} from "./state";

export const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const isLoading = useIsLoadingRecipes();

  return (
    <div className="ribbon">
      <span className="input-with-clear">
        <input
          placeholder="search"
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
        />{" "}
        <button
          className="plain-button"
          disabled={query === "" || isLoading}
          onClick={() => {
            setQuery("");
            clearRecipesSearch();
          }}
        >
          ⤫
        </button>
      </span>
      <button
        className="icon-button"
        disabled={query === "" || isLoading}
        onClick={() => {
          searchRecipes(query);
        }}
      >
        ⏎
      </button>{" "}
    </div>
  );
};
