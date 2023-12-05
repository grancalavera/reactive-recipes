import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import { MutationRequest } from "../lib/mutation";
import { Favorite } from "./model";

const [add$, addFavorite] = createSignal<MutationRequest<Favorite>>();
const [reset$, resetAddFavorite] = createSignal<MutationRequest<void>>();
const [delete$, deleteFavorite] = createSignal<MutationRequest<string>>();

const reset = (correlationId: string) =>
  resetAddFavorite({ correlationId, data: undefined });

export const manageFavorites$ = mergeWithKey({ add$, reset$, delete$ });
export { addFavorite, deleteFavorite, reset as resetAddFavorite };
