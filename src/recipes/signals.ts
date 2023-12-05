import { createSignal, mergeWithKey } from "@react-rxjs/utils";

const [changePage$, changePage] = createSignal<number | undefined>();
const [searchRecipes$, searchRecipes] = createSignal<string>();

const manageRecipeList$ = mergeWithKey({ changePage$, searchRecipes$ });

export { changePage, manageRecipeList$, searchRecipes };
