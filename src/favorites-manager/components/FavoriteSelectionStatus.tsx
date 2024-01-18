import { useFavoriteSelection } from "../state";

export const FavoriteSelectionStatus = () => {
  const count = useFavoriteSelection().length;
  if (count === 0) return <>No favorites selected</>;
  return (
    <>
      {count} favorite{count === 1 ? "" : "s"} selected
    </>
  );
};
