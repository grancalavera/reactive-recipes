import { useState } from "react";
import { searchRecipes } from "./signals";

export const SearchRecipes = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <input
        placeholder="search"
        value={query}
        onChange={(ev) => setQuery(ev.target.value)}
      />
      <button
        disabled={query === ""}
        onClick={() => {
          searchRecipes(query);
        }}
      >
        submit
      </button>{" "}
      <button
        disabled={query === ""}
        onClick={() => {
          setQuery("");
          searchRecipes("");
        }}
      >
        clear
      </button>
      <hr />
    </>
  );
};
