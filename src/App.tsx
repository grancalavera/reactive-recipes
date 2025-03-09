import { Subscribe } from "@react-rxjs/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/Layout";
import { FavoritesManager } from "./favorites-manager/components/FavoritesManager";
import { Recipes } from "./recipes/components/Recipes";

function App() {
  return (
    <>
      <Subscribe>
        <Layout sidebar={<FavoritesManager />} content={<Recipes />} />
      </Subscribe>
      <ToastContainer autoClose={800} />
    </>
  );
}

export default App;
