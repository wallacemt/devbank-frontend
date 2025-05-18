import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { SidebarLeft } from "@/components/ui/sidebar-left";
import { HistoryTransferSidebar } from "../HistoryTransfer";
export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        {children}
      </SidebarInset>
      <HistoryTransferSidebar />
    </SidebarProvider>
  );
};
