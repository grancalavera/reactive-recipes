import { Observable } from "rxjs";

export type MutationRequest<T> = { correlationId: string; data: T };
export type MutationResult<T> = "Idle" | "Awaiting" | Success<T>;
export type ObservableMutationResult<T> = Observable<MutationResult<T>>;
export type Success<T> = { data: T };

export const isSuccess = <T, U extends T = T>(
  candidate: MutationResult<T>,
  refine?: (candidate: T) => candidate is U
): candidate is Success<U> =>
  candidate !== "Idle" &&
  candidate !== "Awaiting" &&
  (refine ? refine(candidate.data) : true);
