import { Subscribe } from "@react-rxjs/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { merge } from "rxjs";
import App from "./App.tsx";
import { MainLoadingAnimation } from "./components/MainLoadingAnimation.tsx";
import { favorites$ } from "./favorites/state.ts";
import "./index.css";
import { recipeList$ } from "./recipes/state.ts";

const source$ = merge(recipeList$, favorites$);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Subscribe source$={source$} fallback={<MainLoadingAnimation />}>
      <App />
    </Subscribe>
  </React.StrictMode>
);
