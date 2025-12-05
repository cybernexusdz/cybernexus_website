import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/cyberAnimations.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const rootElement = document.getElementById("root")!;

// Show content after a brief moment to ensure styles are loaded
setTimeout(() => {
  document.documentElement.style.visibility = "visible";
  rootElement.classList.add("loaded");
}, 50);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
