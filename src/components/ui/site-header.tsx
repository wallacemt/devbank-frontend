import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "./badge";
import { useUserContext } from "@/hooks/useUserContext";
import { balanceFormater } from "@/utils/balanceFormater";
import { TerminalIcon } from "lucide-react";
interface SiteProps {
  title: string;
  context?: "home" | "outher";
}

export function SiteHeader({ title, context = "home" }: SiteProps) {
  const { user, handleTransferTerminal } = useUserContext();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) p-2 relative">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <p className=" font-semibold md:text-[2rem] text-1.6rem">
          {context === "home" && " Ola,"}{" "}
          <span className={`font-principal ${context === "home" ? "text-Destaque/80" : "text-neutral10"}`}>{title}</span>
        </p>
        <div className="flex items-center gap-1 border border-gray-700 max-w-[14rem] truncate rounded-full px-2 py-2 absolute right-2">
          <Badge className={"lg:text-[1rem] text-[0.8rem] text-shadow-neon bg-transparent text-cyan-400 leading-none max-w-full"}>
            {balanceFormater(user?.account.balance!).length > 20
              ? balanceFormater(user?.account.balance!).slice(0, 14) + "..."
              : balanceFormater(user?.account.balance!)}
          </Badge>
          <TerminalIcon
            className="bg-gray-950 text-green-700 rounded-sm cursor-pointer hover:border"
            onClick={handleTransferTerminal}
          />
        </div>
      </div>
    </header>
  );
}
