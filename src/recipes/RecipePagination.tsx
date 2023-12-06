import { changeRecipesPage, useIsLoadingRecipes, useRecipeList } from "./state";

export const RecipePagination = () => {
  const { pagination, count } = useRecipeList();
  const isLoading = useIsLoadingRecipes();

  const pageCount = Math.ceil(count / pagination.size);
  const currentPage = (pagination.from + pagination.size) / pagination.size;

  return (
    <div className="pagination">
      <button
        className="icon-button"
        disabled={pagination.prevFrom === undefined || isLoading}
        onClick={() => changeRecipesPage(pagination.prevFrom)}
      >
        ⬅️
      </button>
      <small>
        page {currentPage} of {pageCount}
      </small>
      <button
        className="icon-button"
        disabled={pagination.nextFrom === undefined || isLoading}
        onClick={() => changeRecipesPage(pagination.nextFrom)}
      >
        ➡️
      </button>
    </div>
  );
};
