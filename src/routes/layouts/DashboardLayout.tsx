import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
export default function DashboardLayout() {
  return (
      <SidebarProvider>

      <AppSidebar />
      <main className="w-full h-full">
        <div className="w-full sticky top-0 z-50 ">
        <Navbar/>

        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
