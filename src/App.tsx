import { Subscribe } from "@react-rxjs/core";
import { ToastContainer } from "react-toastify";
import { Layout } from "./components/Layout";
import { Favorites } from "./favorites/Favorites";
import { Recipes } from "./recipes/Recipes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Subscribe>
        <Layout sidebar={<Favorites />} content={<Recipes />} />
      </Subscribe>
      <ToastContainer autoClose={800} />
    </>
  );
}

export default App;
