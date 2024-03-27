import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ConversationProvider } from "./contexts/ConversationContext.tsx";
import { NavbarProvider } from "./contexts/NavBarContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <NavbarProvider>
        <ConversationProvider>
          <App />
        </ConversationProvider>
      </NavbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
