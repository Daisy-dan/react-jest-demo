import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.tsx";
import Login from "./components/Login.tsx";
import Three from "./components/Three.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <StrictMode>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/three" element={<Three />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </StrictMode>
  </Router>
);
