import { nanoid } from "nanoid";
import { isSuccess } from "../lib/mutation";
import {
  bulkRemoveFavorites,
  resetFavoritesResult,
  useFavoritesResult,
} from "./state.manage";
import { useFavoriteSelection, useIsFavoriteDisabled } from "./state.selection";
import { bind } from "@react-rxjs/core";
import { map, timer } from "rxjs";
import { useEffect } from "react";
import { set } from "zod";

const REMOVE_ALL_FAVORITES = nanoid();

export const RemoveFavoriteSelection = () => {
  const isDisabled = useIsFavoriteDisabled();
  const selection = useFavoriteSelection();

  return (
    <>
      <button
        className="icon-button"
        disabled={isDisabled}
        onClick={() =>
          bulkRemoveFavorites({
            correlationId: REMOVE_ALL_FAVORITES,
            data: selection,
          })
        }
      >
        🗑️
      </button>
    </>
  );
};

export const RemoveFavoriteSelectionConfirmation = () => {
  const result = useFavoritesResult(REMOVE_ALL_FAVORITES);

  if (isSuccess(result, (data): data is string[] => Array.isArray(data))) {
    const data = result.data;
    return (
      <Toast
        message={`${data.length} favorite${
          data.length == 1 ? "" : "s"
        } removed`}
        onClose={() => resetFavoritesResult(REMOVE_ALL_FAVORITES)}
      />
    );
  }

  return null;
};

const Toast = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const tid = setTimeout(onClose, 5000);
    return () => clearTimeout(tid);
  });

  return (
    <small className="ribbon toast">
      {message}
      <button className="plain-button" onClick={() => onClose()}>
        ✕
      </button>
    </small>
  );
};
