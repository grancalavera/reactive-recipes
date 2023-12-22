import { Observable, map, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { httpErrorFromResponse } from "../lib/errors";
import {
  PaginatedRecipeListResult,
  RecipeListRequest,
  recipeListResultSchema,
} from "./model";

const endpoint = "/api/recipes";

export const recipeList$ = (
  _request: RecipeListRequest
): Observable<PaginatedRecipeListResult> => {
  // const params = Object.entries(request).map(([key, value]) => [
  //   key,
  //   value.toString(),
  // ]);

  return fromFetch(
    `${endpoint}?${new URLSearchParams({ _page: "10", _limit: "5" })}`
  ).pipe(
    switchMap(async (response) => {
      if (!response.ok) {
        throw httpErrorFromResponse(response);
      }
      const results = await response.json();
      return {
        page: { _page: 10, _limit: 5 },
        results,
        pagination: parsePagination(response),
        count: parseInt(response.headers.get("x-total-count") ?? "0"),
      };
    }),
    map((data) => recipeListResultSchema.parse(data))
  );
};

const parsePagination = (response: Response): unknown => {
  try {
    return Object.fromEntries(
      response.headers
        .get("link")
        ?.split(",")
        .map((x) => x.split(";"))
        .map(([link, rel]) => {
          const url = new URL(
            link?.trim().replace("<", "").replace(">", "") ?? ""
          );

          return [
            rel?.trim().replace('rel="', "").replace('"', "") ?? "",
            {
              _page: parseInt(url.searchParams.get("_page") ?? ""),
              _limit: parseInt(url.searchParams.get("_limit") ?? ""),
            },
          ];
        }) ?? []
    );
  } catch {
    return {};
  }
};
