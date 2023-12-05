import { Subscribe } from "@react-rxjs/core";
import { Favorites } from "./favorites/Favorites";
import { RecipeList } from "./recipes/RecipeList";

function App() {
  return (
    <Subscribe>
      <RecipeList />
      <Favorites />
    </Subscribe>
  );
}

export default App;
