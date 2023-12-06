import { useId } from "react";
import { isSuccess } from "../lib/mutation";
import {
  bulkRemoveFavorites,
  resetFavoritesResult,
  useFavoritesResult,
} from "./state.manage";
import { useIsFavoriteDisabled, useFavoriteSelection } from "./state.selection";

export const RemoveFavoriteSelection = () => {
  const correlationId = useId();
  const isDisabled = useIsFavoriteDisabled();
  const selection = useFavoriteSelection();

  const result = useFavoritesResult(correlationId);

  return (
    <>
      <button
        className="icon-button"
        disabled={isDisabled}
        onClick={() => bulkRemoveFavorites({ correlationId, data: selection })}
      >
        🗑️
      </button>
      {isSuccess(result) &&
      Array.isArray(result.data) &&
      selection.length === 0 ? (
        <Confirmation
          onDismiss={() => resetFavoritesResult(correlationId)}
          data={result.data}
        />
      ) : null}
    </>
  );
};

const Confirmation = ({
  onDismiss,
  data,
}: {
  onDismiss: () => void;
  data: string[];
}) => {
  return (
    <small>
      {`${data.length} favorite${data.length == 1 ? "" : "s"} removed.`}
      <button className="icon-button" onClick={() => onDismiss()}>
        🆗
      </button>
    </small>
  );
};
