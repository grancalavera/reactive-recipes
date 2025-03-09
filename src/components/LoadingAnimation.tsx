import { bind, Subscribe } from "@react-rxjs/core";
import { interval, map, startWith } from "rxjs";

const sequence = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];

const [useLoader, loader$] = bind(
  interval(150).pipe(
    map((i) => sequence[(i + 1) % sequence.length]),
    startWith(sequence[0])
  )
);

const LoadingAnimationComponent = () => {
  const loader = useLoader();
  return <span>{loader}</span>;
};

export const LoadingAnimation = () => (
  <Subscribe source$={loader$}>
    <LoadingAnimationComponent />
  </Subscribe>
);
