import { bind, Subscribe } from "@react-rxjs/core";
import { useState } from "react";
import { interval, shareReplay } from "rxjs";

const source$ = interval(1000).pipe(
  shareReplay({ bufferSize: 1, refCount: true })
);

const [useSource] = bind(source$);

export const ReactRxJsInterval = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow((x) => !x)}>Toggle</button>
      {show && (
        <Subscribe fallback={<h3>loading...</h3>}>
          <IntervalComponent />
        </Subscribe>
      )}
    </div>
  );
};

const IntervalComponent = () => {
  const value = useSource();
  return <h1>{value}</h1>;
};
