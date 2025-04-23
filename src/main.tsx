import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './global.css'
import { BrowserRouter } from "react-router";
import { RoutesApp } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  </StrictMode>
);
