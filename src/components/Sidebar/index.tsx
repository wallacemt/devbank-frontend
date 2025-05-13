import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { SidebarLeft } from "@/components/ui/sidebar-left";
import { SidebarRight } from "@/components/ui/sidebar-right";
export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        {children}
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
};
