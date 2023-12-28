import { bind } from "@react-rxjs/core";
import { interval, map, startWith } from "rxjs";

const loading = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
const loader$ = interval(150).pipe(
  map((i) => loading[(i + 1) % loading.length]),
  startWith(loading[0])
);
const [useLoader] = bind(loader$);

export const LoadingAnimation = () => {
  const loader = useLoader();
  return <span>{loader}</span>;
};
