import { Toaster } from 'react-hot-toast';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
      <Toaster position="top-right" />
    </CartProvider>
     
  </React.StrictMode>
);
