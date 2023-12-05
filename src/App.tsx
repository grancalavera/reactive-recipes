import { Subscribe } from "@react-rxjs/core";
import { Favorites } from "./favorites/Favorites";
import { AddFavorite } from "./favorites/AddFavorite";

function App() {
  return (
    <Subscribe>
      <AddFavorite />
      <Favorites />
    </Subscribe>
  );
}

export default App;
