import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  SendHorizontal,
  CreditCard,
  Smartphone,
  DollarSign,
  Briefcase,
  Coins,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

const options = [
  { title: "Transfer Chell", icon: GitBranch, highlight: true },
  { title: "Push Pix", icon: SendHorizontal },
  { title: "Commit Pagamento", icon: CreditCard },
  { title: "Stash Caixinha", icon: Coins },
  { title: "Deploy Recarga", icon: Smartphone },
  { title: "Fork Empréstimo", icon: DollarSign },
  { title: "Merge Investimentos", icon: Briefcase },
];

interface SlideOptionsProps {
  items?: {
    title: string;
    icon: LucideIcon;
    highlight?: boolean;
  }[];
}

export function SlideOptions({ items = options }: SlideOptionsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap pb-4">
      <div className="flex gap-5 px-4">
        {items.map((item) => (
            <>
          <Card
            key={item.title}
            className={cn(
              "flex flex-col items-center justify-center w-24 h-24 shrink-0 rounded-full border hover:shadow-md transition-all cursor-pointer gap-2 text-center",
              item.highlight && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <item.icon className="w-7 h-7" />
            <span className="text-[0.7rem] leading-tight font-medium">
              {item.title}
            </span>
          </Card>
            </>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
