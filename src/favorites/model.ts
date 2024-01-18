import { nanoid } from "nanoid";

export type Favorite = {
  id: string;
  recipeId: number;
  recipeName: string;
};

export const createFavorite = (
  recipeId: number,
  recipeName: string
): Favorite => ({
  id: nanoid(4),
  recipeId,
  recipeName,
});
