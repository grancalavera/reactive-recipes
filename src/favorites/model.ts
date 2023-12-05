import { nanoid } from "nanoid";

export type Favorite = {
  id: string;
  recipeId: number;
  recipeName: string;
};

export const isFavorite = (candidate: unknown): candidate is Favorite => {
  const candidateAsFavorite = candidate as Favorite;
  return (
    candidateAsFavorite !== null &&
    candidateAsFavorite !== undefined &&
    typeof candidateAsFavorite === "object" &&
    candidateAsFavorite.id !== undefined &&
    candidateAsFavorite.recipeId !== undefined &&
    candidateAsFavorite.recipeName !== undefined
  );
};

export const createFavorite = (
  recipeId: number,
  recipeName: string
): Favorite => ({
  id: nanoid(4),
  recipeId,
  recipeName,
});
