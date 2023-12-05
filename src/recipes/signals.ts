import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import { Page } from "./model";

const [changePage$, changePage] = createSignal<Page | undefined>();
const [searchRecipes$, searchRecipes] = createSignal<string>();

const manageRecipeList$ = mergeWithKey({ changePage$, searchRecipes$ });

export { manageRecipeList$, changePage, searchRecipes };
