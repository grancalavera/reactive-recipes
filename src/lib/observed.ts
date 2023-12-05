import { Observable } from "rxjs";

export type Observed<T> = T extends Observable<infer U> ? U : never;
