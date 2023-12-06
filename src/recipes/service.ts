import { Observable, map, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { httpErrorFromResponse } from "../lib/errors";
import {
  PaginatedRecipeListResult,
  RecipeListRequest,
  getPagination,
  recipeListResultSchema,
} from "./model";

const apiKey = import.meta.env.VITE_RAPID_API_KEY;
const apiHost = import.meta.env.VITE_RAPID_API_HOST;
const url = new URL(`https://${apiHost}/recipes/list`);

export const recipeList$ = (
  request: RecipeListRequest
): Observable<PaginatedRecipeListResult> => {
  const params = Object.entries(request).map(([key, value]) => [
    key,
    value.toString(),
  ]);

  return fromFetch(`${url}?${new URLSearchParams(params)}`, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
  }).pipe(
    switchMap((response) => {
      if (!response.ok) {
        throw httpErrorFromResponse(response);
      }
      return response.json();
    }),
    map((data) => {
      const parsed = recipeListResultSchema.parse(data);
      return {
        ...parsed,
        pagination: getPagination(request, parsed.count),
      };
    })
  );
};
