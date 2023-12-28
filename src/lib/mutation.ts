import { bind } from "@react-rxjs/core";
import { createSignal, mergeWithKey } from "@react-rxjs/utils";
import { useRef } from "react";
import { catchError, from, map, of, startWith, switchMap } from "rxjs";
import { assertNever } from "./assertNever";
import { errorFromUnknown } from "./errors";
import * as result from "./result";
import { AsyncResult } from "./result";

export type Mutation<TParams = void, TResponse = void> = {
  mutate: (params: TParams) => void;
  reset: () => void;
  result: AsyncResult<TResponse>;
};

const createMutation = <TParams, TResponse>(
  mutationFn: (params: TParams) => Promise<TResponse>
) => {
  const [mutate$, mutate] = createSignal<TParams>();
  const [reset$, reset] = createSignal();

  const mutation$ = mergeWithKey({ mutate$, reset$ }).pipe(
    switchMap((signal) => {
      switch (signal.type) {
        case "reset$": {
          return of(result.idle);
        }
        case "mutate$": {
          return from(mutationFn(signal.payload)).pipe(
            map((response) => result.success(response)),
            catchError((error) => of(errorFromUnknown(error))),
            startWith(result.loading)
          );
        }
        default: {
          assertNever(signal);
        }
      }
    }),
    startWith(result.idle)
  );

  const [useResult] = bind<AsyncResult<TResponse>>(mutation$);

  return { mutate, reset, useResult };
};

// prettier-ignore
export function useMutation(mutationFunction: () => Promise<void>): Mutation<void, void>;
// prettier-ignore
export function useMutation<TParams>(mutationFunction: (params: TParams) => Promise<void>): Mutation<TParams, void>;
// prettier-ignore
export function useMutation<TParams, TResponse>(mutationFunction: (params: TParams) => Promise<TResponse>): Mutation<TParams, TResponse>;
// prettier-ignore
export function useMutation<TParams = void, TResult = void>(mutationFunction: (params: TParams) => Promise<TResult>): Mutation<TParams, TResult> {
  const { mutate, reset, useResult } = useRef(
    createMutation(mutationFunction)
  ).current;
  return { result: useResult(), mutate, reset };
}
