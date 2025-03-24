import { Subscribe } from "@react-rxjs/core";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { FavoriteSelectionStatus } from "./FavoriteSelectionStatus";
import { FavoritesBulkLoader } from "./FavoritesBulkLoader";
import { FavoritesCount } from "./FavoritesCount";
import { FavoritesList } from "./FavoritesList";
import { RemoveFavoriteSelection } from "./RemoveFavoriteSelection";
import { ToggleSelectAllFavorites } from "./ToggleSelectAllFavorites";
import { errorFromUnknown } from "../../lib/errors";

export const FavoritesManager = () => (
  <Subscribe>
    <section style={{ position: "relative" }}>
      <h3>
        Favorites <FavoritesBulkLoader />
      </h3>
      <div className="ribbon">
        <ToggleSelectAllFavorites />

        <ErrorBoundary FallbackComponent={Fallback}>
          <RemoveFavoriteSelection />
        </ErrorBoundary>

        <FavoritesCount />
      </div>
      <hr />
      <FavoritesList />
      <hr />
      <FavoriteSelectionStatus />
    </section>
  </Subscribe>
);

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div>
    <p>{errorFromUnknown(error).message}</p>
    <button onClick={() => resetErrorBoundary()}>Try again</button>
  </div>
);
