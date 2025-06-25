import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/routes/pages/Home";
import Dashboard from "@/routes/pages/Dashboard";
import DeepFake from "@/routes/pages/DeepFake";
import LLM from "@/routes/pages/LLM";
import TTS from "@/routes/pages/TTS";
import DashboardLayout from "@/routes/layouts/DashboardLayout";
import ImageGen from "@/routes/pages/ImageGen";
import { ThemeProvider } from "@/components/theme-provider"
import "@/index.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// Create a client
const queryClient = new QueryClient()



const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="DeepFake" element={<DeepFake />} />
          <Route path="LLM" element={<LLM />} />
          <Route path="TTS" element={<TTS />} />
          <Route path="ImageGen" element={<ImageGen />} />
        </Route>
      </Routes>
    </BrowserRouter>
        </QueryClientProvider>

  </ThemeProvider>
);
