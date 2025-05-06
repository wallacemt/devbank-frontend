import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter } from "react-router";
import { RoutesApp } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { UserProvider } from "./contexts/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <RoutesApp />
        <Toaster richColors position="top-right" expand />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
