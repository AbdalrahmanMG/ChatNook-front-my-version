import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId="456346090324-okqspfmksuarjqdobuamiofq7c0d67bv.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  // </React.StrictMode>
);
