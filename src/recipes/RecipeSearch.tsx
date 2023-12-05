import { useState } from "react";
import { searchRecipes } from "./signals";

export const RecipeSearch = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="tools">
      <input
        placeholder="search"
        value={query}
        onChange={(ev) => setQuery(ev.target.value)}
      />{" "}
      <button
        className="icon-button"
        disabled={query === ""}
        onClick={() => {
          searchRecipes(query);
        }}
      >
        ⏎
      </button>{" "}
      <button
        className="icon-button"
        disabled={query === ""}
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
