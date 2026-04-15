import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { initStorage } from "./lib/storage.ts";

// Initialize data layer
initStorage();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
