import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
    </GoogleOAuthProvider>
);
