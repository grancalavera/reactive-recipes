import { describe, it, expect } from "vitest";
import {
  emptySelection,
  selectFavorite,
  deselectFavorite,
  bulkDeselectFavorites,
  selectAllFavorites,
  isFavoriteSelected,
  isFavoritesSelectionEmpty,
  zombieFavoritesSelection,
  areAllFavoriteSelected,
} from "./model";
import type { Favorite } from "../favorites/model";

describe("FavoritesSelection model", () => {
  it("emptySelection should start empty", () => {
    expect(emptySelection.size).toBe(0);
  });

  it("selectFavorite adds an id to the selection and returns the same set", () => {
    const selection = new Set<string>();
    const result = selectFavorite(selection, "a");
    expect(result).toBe(selection);
    expect(selection.has("a")).toBe(true);
  });

  it("deselectFavorite removes an id from the selection and returns the same set", () => {
    const selection = new Set<string>(["a"]);
    const result = deselectFavorite(selection, "a");
    expect(result).toBe(selection);
    expect(selection.has("a")).toBe(false);
  });

  it("bulkDeselectFavorites removes multiple ids from the selection", () => {
    const selection = new Set<string>(["a", "b", "c"]);
    const result = bulkDeselectFavorites(selection, ["a", "c"]);
    expect(result).toBe(selection);
    expect(selection.has("a")).toBe(false);
    expect(selection.has("c")).toBe(false);
    expect(selection.has("b")).toBe(true);
  });

  it("selectAllFavorites adds all provided ids to the selection", () => {
    const selection = new Set<string>();
    const result = selectAllFavorites(selection, ["x", "y"]);
    expect(result).toBe(selection);
    expect(selection.has("x")).toBe(true);
    expect(selection.has("y")).toBe(true);
  });

  it("isFavoriteSelected returns a predicate that checks if id is selected", () => {
    const check = isFavoriteSelected("foo");
    const selection = new Set<string>(["foo"]);
    expect(check(selection)).toBe(true);
    expect(check(new Set<string>())).toBe(false);
  });

  it("isFavoritesSelectionEmpty returns true when selection is empty and false otherwise", () => {
    expect(isFavoritesSelectionEmpty(new Set<string>())).toBe(true);
    expect(isFavoritesSelectionEmpty(new Set<string>(["foo"]))).toBe(false);
  });

  it("zombieFavoritesSelection filters out ids that do not exist in favorites list", () => {
    const selection = ["1", "2", "3"];
    const favorites: Favorite[] = [
      { id: "2", recipeId: 2, recipeName: "Recipe 2" },
      { id: "3", recipeId: 3, recipeName: "Recipe 3" },
    ];
    expect(zombieFavoritesSelection(selection, favorites)).toEqual(["1"]);
  });

  it("areAllFavoriteSelected returns false when selectionLength is 0, false when lengths differ, and true when lengths match and selection is non-empty", () => {
    expect(areAllFavoriteSelected(0, 0)).toBe(false);
    expect(areAllFavoriteSelected(1, 2)).toBe(false);
    expect(areAllFavoriteSelected(2, 2)).toBe(true);
  });
});
