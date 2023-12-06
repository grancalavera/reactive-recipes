import { Subscribe } from "@react-rxjs/core";
import { Layout } from "./components/Layout";
import { Favorites } from "./favorites/Favorites";
import { Recipes } from "./recipes/Recipes";

function App() {
  return (
    <Subscribe>
      <Layout sidebar={<Favorites />} content={<Recipes />} />
    </Subscribe>
  );
}

export default App;
