import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";
import { Toaster } from "react-hot-toast";

export const BASE_API = import.meta.env.VITE_BASE_API;
export const BASE_URL = import.meta.env.VITE_BASE_URL;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <Toaster />
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
