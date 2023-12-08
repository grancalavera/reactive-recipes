import { z } from "zod";

export type RecipeListRequest = {
  from: number;
  size: number;
  q?: string;
};

export type Page = {
  from: number;
  size: number;
};

export type Pagination = {
  size: number;
  from: number;
  nextFrom?: number;
  prevFrom?: number;
};

export const getPagination = (
  request: RecipeListRequest,
  count: number
): Pagination => {
  const nextFrom = request.from + request.size;
  const prevFrom = request.from - request.size;

  const pagination: Pagination = { size: request.size, from: request.from };
  if (nextFrom < count) pagination.nextFrom = nextFrom;
  if (prevFrom > -1) pagination.prevFrom = prevFrom;

  return pagination;
};

const instructionStep = z.object({
  display_text: z.string(),
});

const recipeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const recipeListResultSchema = z.object({
  count: z.number(),
  results: recipeSchema.array(),
});

export type Recipe = z.infer<typeof recipeSchema>;
export type InstructionStep = z.infer<typeof instructionStep>;

export type RecipeListResult = z.infer<typeof recipeListResultSchema>;

export type PaginatedRecipeListResult = RecipeListResult & {
  pagination: Pagination;
};

export const defaultRequest: RecipeListRequest = { from: 0, size: 10 };
