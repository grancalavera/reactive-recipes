import { z } from "zod";

export type RecipeListRequest = Page & {
  q?: string;
};

const recipeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const pageSchema = z.object({
  _page: z.number(),
  _limit: z.number(),
});

const paginationSchema = z.object({
  first: pageSchema.optional(),
  last: pageSchema.optional(),
  prev: pageSchema.optional(),
  next: pageSchema.optional(),
});

export const recipeListResultSchema = z.object({
  count: z.number(),
  _page: z.number(),
  _limit: z.number(),
  pagination: paginationSchema,
  results: recipeSchema.array(),
});

export type Recipe = z.infer<typeof recipeSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type Page = z.infer<typeof pageSchema>;

export type RecipeListResult = z.infer<typeof recipeListResultSchema>;

export const defaultRequest: RecipeListRequest = {
  _page: 1,
  _limit: 5,
};
