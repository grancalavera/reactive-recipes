import { Page } from "../model";
import {
  changeRecipesPage,
  useIsLoadingRecipes,
  useRecipeList,
} from "../state";

export const RecipePagination = () => {
  const isLoading = useIsLoadingRecipes();

  const { pagination, _page } = useRecipeList();
  const pageCount = pagination.last?._page ?? 1;

  const createPageChanger = (page: Page | undefined) => () => {
    if (!page) return;
    changeRecipesPage(page);
  };

  return (
    <div className="pagination">
      <button
        className="icon-button"
        disabled={pagination.prev === undefined || isLoading}
        onClick={createPageChanger(pagination.prev)}
      >
        ⬅️
      </button>
      <small>
        page {_page} of {pageCount}
      </small>
      <button
        className="icon-button"
        disabled={pagination.next === undefined || isLoading}
        onClick={createPageChanger(pagination.next)}
      >
        ➡️
      </button>
    </div>
  );
};
