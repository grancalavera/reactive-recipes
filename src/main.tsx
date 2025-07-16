import React from "react";
import ReactDOM from "react-dom/client";
import { Center } from "./components/Center.tsx";
import { FullScreen } from "./components/FullScreen.tsx";
import "./index.css";
import { NaiveInterval } from "./NaiveInterval.tsx";
import { ReactRxJsInterval } from "./ReactRxJSNaiveInterval.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FullScreen>
      <Center>
        <div style={{ border: "1px solid blue", padding: 20, margin: 10 }}>
          <NaiveInterval />
          <NaiveInterval />
        </div>

        <div style={{ border: "1px solid orange", padding: 20, margin: 10 }}>
          <ReactRxJsInterval />
          <ReactRxJsInterval />
        </div>
      </Center>
    </FullScreen>
  </React.StrictMode>
);
