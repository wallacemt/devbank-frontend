import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { SidebarLeft } from "@/components/ui/sidebar-left";
import { SidebarRight } from "../ui/sidebar-right";
import { useUserContext } from "@/hooks/useUserContext";
import { TransferShell } from "../Transfers/TransferShell";
export const Sidebar = ({ children, right = false }: { children: ReactNode; right?: boolean }) => {
  const { transferTerminal } = useUserContext();

  return (
    <SidebarProvider className="!overflow-hidden">
      <SidebarLeft />
      <SidebarInset>{children}</SidebarInset>
      {right && <SidebarRight />}
      {transferTerminal && <TransferShell terminalVisible={transferTerminal} />}
    </SidebarProvider>
  );
};
