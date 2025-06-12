import * as React from "react";
import {
  Bell,
  ChartBar,
  SquareDashedBottomCode,
  Wallet,
  ShieldCheck,
  ChartNoAxesCombined,
  CreditCard,
  History,
  Coins,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Separator } from "@/components/ui/separator";
import { Card } from "./card";
import { Link } from "react-router";

const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: SquareDashedBottomCode,
    isActive: true,
  },
  {
    title: "Transações",
    url: "/history",
    icon: History,
  },
  {
    title: "Stashs",
    url: "/stashs",
    icon: Coins,
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

export function SidebarLeft(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r bg-background" {...props}>
      <SidebarHeader>
        <Link to={"/"}>
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
        </Link>

        <Separator className="my-2" />

        <NavMain items={navMain} />
      </SidebarHeader>
      <div className="absolute bottom-0">
        <NavUser />
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
  1