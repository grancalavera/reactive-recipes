import { Subscribe } from "@react-rxjs/core";
import { Favorites } from "./favorites/Favorites";
import { Recipes } from "./recipes/Recipes";
import { Layout } from "./Layout";

function App() {
  return (
    <Subscribe>
      <Layout sidebar={<Favorites />} content={<Recipes />} />
    </Subscribe>
  );
}

export default App;
