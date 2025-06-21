import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/routes/pages/Home";
import Start from "@/routes/pages/Start";
import PreCheck from "@/routes/pages/PreCheck";
import TrainningRound from "@/routes/pages/TrainningRound";
import FileUpload from "@/routes/pages/FileUpload";

import { ThemeProvider } from "@/components/theme-provider"
import "@/index.css"; 
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Start />} />
        <Route path="/precheck" element={<PreCheck />} />
        <Route path="/trainning" element={<TrainningRound />} />
        <Route path="/fileupload" element={<FileUpload />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
