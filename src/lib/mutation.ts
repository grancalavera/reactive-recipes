import { Observable } from "rxjs";

export type MutationRequest<T> = { correlationId: string; data: T };
export type MutationResult<T> = "Idle" | "Awaiting" | { data: T };
export type ObservableMutationResult<T> = Observable<MutationResult<T>>;
