/**
 * Throws an error with "unexpected object". Mostly meant to be used
 * to handle error/default cases on switches where a unexpected case is
 * raise
 * @param x
 */
export function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
