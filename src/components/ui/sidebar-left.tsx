import * as React from "react";
import {
  BadgeHelp,
  Bell,
  ChartBar,
  Cog,
  SquareDashedBottomCode,
  Wallet,
  ShieldCheck,
  ChartNoAxesCombined,
  CreditCard,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavSecondary } from "@/components/ui/nav-secondary";
import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Separator } from "@/components/ui/separator";
import { Card } from "./card";

const navMain = [
  {
    title: "Dashboard",
    url: "#",
    icon: SquareDashedBottomCode,
    isActive: true,
  },
  {
    title: "Graficos",
    url: "#",
    icon: ChartBar,
  },
  {
    title: "Investimentos",
    url: "#",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Carteira",
    url: "#",
    icon: Wallet,
  },
  {
    title: "Cartões",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Segurança",
    url: "#",
    icon: ShieldCheck,
  },
  {
    title: "Notificações",
    url: "#",
    icon: Bell,
  },
];

const navSecondary = [
  {
    title: "Configuração",
    url: "#",
    icon: Cog,
  },
  {
    title: "Ajuda",
    url: "#",
    icon: BadgeHelp,
  },
];

export function SidebarLeft(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r bg-background" {...props}>
      <SidebarHeader>
        <Card
          className="flex flex-col items-center gap-2 px-4 py-2 text-center bg-transparent "
          style={{ userSelect: "none" }}
        >
          <div className="text-3xl font-bold font-principal leading-tight">
            <span className="text-Destaque">Dev</span>
            BANK
            <span className="text-amber-600"> $</span>
          </div>
          <p className="text-xs text-muted-foreground">Controle sua vida financeira como um dev</p>
        </Card>

        <Separator className="my-2" />

        <div className="px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Menu</div>
        <NavMain items={navMain} />
      </SidebarHeader>
      <div className="px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Configurações</div>
      <NavSecondary items={navSecondary} />

      <Separator className="my-4" />

      <div className="absolute bottom-0">
        <div className="px-4 mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Conta</div>
        <NavUser />
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
