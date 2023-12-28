import { z } from "zod";

export type RecipeListRequest = ListRecipes | SearchRecipes;

type ListRecipes = Page;

type SearchRecipes = Page & {
  q: string;
};

const isSearchRequest = (
  request: RecipeListRequest
): request is SearchRecipes => (request as SearchRecipes).q !== undefined;

export const changePage = (
  request: RecipeListRequest,
  page: Page
): RecipeListRequest =>
  request._page === page._page && request._limit === page._limit
    ? request
    : { ...request, ...page };

export const search = (
  request: RecipeListRequest,
  q: string
): RecipeListRequest =>
  isSearchRequest(request) && request.q === q
    ? request
    : { ...defaultRequest, q };

export const clearSearch = (request: RecipeListRequest): RecipeListRequest =>
  isSearchRequest(request) ? defaultRequest : request;

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

export type RecipeListResponse = z.infer<typeof recipeListResultSchema>;

export const defaultRequest: RecipeListRequest = {
  _page: 1,
  _limit: 12,
};
