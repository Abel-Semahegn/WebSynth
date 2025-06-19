import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "@/routes/App";
import { ThemeProvider } from "@/components/theme-provider"
import "@/index.css"; 
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
