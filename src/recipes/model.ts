import { z } from "zod";

export type RecipeListRequest = {
  from: number;
  size: number;
  q?: string;
  sort?: "approved_at:desc" | "approved_at:asc";
};

export type Page = {
  from: number;
  size: number;
};

export type Pagination = {
  nextPage?: Page;
  prevPage?: Page;
};

export const getPagination = (
  request: RecipeListRequest,
  count: number
): Pagination => {
  const next = request.from + request.size;
  const prev = request.from - request.size;

  const pagination: Pagination = {};
  if (next < count) pagination.nextPage = { size: request.size, from: next };
  if (prev > -1) pagination.prevPage = { size: request.size, from: prev };

  return pagination;
};

const instructionStep = z.object({
  display_text: z.string(),
});

const recipeSchema = z.object({
  id: z.number(),
  description: z.string(),
  name: z.string(),
  instructions: instructionStep.array(),
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

export const defaultRequest: RecipeListRequest = { from: 0, size: 5 };
