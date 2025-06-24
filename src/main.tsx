import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/routes/pages/Home";
import Dashboard from "@/routes/pages/Dashboard";
import DeapFake from "@/routes/pages/DeepFake";
import LLM from "@/routes/pages/LLM";
import TTS from "@/routes/pages/TTS";
import DashboardLayout from "@/routes/layouts/DashboardLayout";
import ImageGen from "@/routes/pages/ImageGen";
import { ThemeProvider } from "@/components/theme-provider"
import "@/index.css";
const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="DeapFake" element={<DeapFake />} />
          <Route path="LLM" element={<LLM />} />
          <Route path="TTS" element={<TTS />} />
          <Route path="ImageGen" element={<ImageGen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
