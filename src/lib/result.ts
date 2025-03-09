export type Result<T> = Error | Success<T>;
export type AsyncResult<T> = Idle | Loading | Error | Success<T>;
export type Success<T> = { data: T };

type Idle = "Idle";
type Loading = "Loading";

export const idle: Idle = "Idle";
export const loading: Loading = "Loading";

export function success(): Success<void>;
export function success<T>(data: T): Success<T>;
export function success<T = void>(data?: T): Success<T | void> {
  return { data };
}

export const isIdle = <T>(candidate: AsyncResult<T>): candidate is Idle =>
  candidate === idle;

export const isLoading = <T>(candidate: AsyncResult<T>): candidate is Loading =>
  candidate === loading;

// prettier-ignore
export function isSuccess<T>(candidate: Result<T>): candidate is Success<T>;
// prettier-ignore
export function isSuccess<T>(candidate: AsyncResult<T>): candidate is Success<T>;
// prettier-ignore
export function isSuccess<T>(candidate: AsyncResult<T> | AsyncResult<T>): candidate is Success<T> {
  return candidate !== idle && candidate !== loading && !isError(candidate);
}

export function isError<T>(candidate: Result<T>): candidate is Error;
export function isError<T>(candidate: AsyncResult<T>): candidate is Error;
export function isError<T>(candidate: AsyncResult<T>): candidate is Error {
  return candidate instanceof Error;
}
