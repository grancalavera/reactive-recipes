import { Observable } from "rxjs";

export type MutationRequest<T> = { correlationId: string; data: T };
export type MutationResult<T> = "Idle" | "Awaiting" | Success<T>;
export type ObservableMutationResult<T> = Observable<MutationResult<T>>;
export type Success<T> = { data: T };

export const isSuccess = <T>(
  candidate: MutationResult<T>
): candidate is Success<T> => candidate !== "Awaiting" && candidate !== "Idle";
