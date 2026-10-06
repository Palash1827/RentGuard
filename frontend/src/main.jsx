import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { RentGuardProvider } from "./context/RentGuardContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RentGuardProvider>
          <App />
        </RentGuardProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);