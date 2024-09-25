import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from "@kazion/react-facebook-login";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID_OF_GOOGLE}>
      <FacebookProvider
        appId={import.meta.env.VITE_CLIENT_ID_OF_FACEBOOK}
        version="v19.0"
      >
        <App />
      </FacebookProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
