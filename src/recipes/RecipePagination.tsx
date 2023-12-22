import { useIsLoadingRecipes, useRecipeList } from "./state";

export const RecipePagination = () => {
  const { pagination, page } = useRecipeList();
  const isLoading = useIsLoadingRecipes();

  const pageCount = pagination.last._page;
  const currentPage = page._page;

  return (
    <div className="pagination">
      <button
        className="icon-button"
        disabled={pagination.prev === undefined || isLoading}
        onClick={() => {
          // changeRecipesPage(pagination.prevFrom);
        }}
      >
        ⬅️
      </button>
      <small>
        page {currentPage} of {pageCount}
      </small>
      <button
        className="icon-button"
        disabled={pagination.next === undefined || isLoading}
        onClick={() => {
          // changeRecipesPage(pagination.nextFrom);
        }}
      >
        ➡️
      </button>
    </div>
  );
};
