import { useEffect, useState } from "react";
import { interval, shareReplay } from "rxjs";

const source$ = interval(1000).pipe(
  shareReplay({ bufferSize: 1, refCount: true })
);

export const NaiveInterval = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow((x) => !x)}>Toggle</button>
      {show && <IntervalComponent />}
    </div>
  );
};

const IntervalComponent = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const subscription = source$.subscribe((x) => {
      return setValue(x);
    });
    return () => subscription.unsubscribe();
  }, []);

  return <h1>{value}</h1>;
};
