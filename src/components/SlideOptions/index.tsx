import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Smartphone,
  DollarSign,
  Briefcase,
  Coins,
  type LucideIcon,
  TerminalSquare,
  Banknote,
} from "lucide-react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { TooltipContent, TooltipTrigger, Tooltip } from "@/components/ui/tooltip";
import { PushPixModal } from "../PushPixModal";
import React, { ReactNode, useState } from "react";
import { FaPix } from "react-icons/fa6";
import { useUserContext } from "@/hooks/useUserContext";

interface SlideOptionsProps {
  items?: {
    id: string;
    title: string;
    icon: LucideIcon | React.ComponentType;
    highlight?: boolean;
    type?: "modal" | "action";
    modalElement?: (open: boolean, setOpen: () => void) => ReactNode;
    action?: () => void;
  }[];
}

export function SlideOptions() {
  const [modalOpenId, setModalOpenId] = useState<string | null>(null);
  const { handleTransferTerminal } = useUserContext();
  const options: SlideOptionsProps["items"] = [
    {
      id: "transferChell",
      title: "Transfer Chell",
      icon: TerminalSquare,
      highlight: true,
      type: "action",
      action: handleTransferTerminal,
    },
    {
      id: "pushPix",
      title: "Push Pix",
      icon: FaPix,
      type: "modal",
      modalElement: (open, setOpen) => <PushPixModal open={open} setOpen={setOpen} />,
    },
    { id: "commitPagamento", title: "Commit Pagamento", icon: CreditCard },
    { id: "pullDeposito", title: "Pull Deposito", icon: Banknote },
    { id: "stashCaixa", title: "Stash Caixinha", icon: Coins },
    { id: "deployRecarga", title: "Deploy Recarga", icon: Smartphone },
    { id: "forkEmprestimo", title: "Fork Empréstimo", icon: DollarSign },
    { id: "mergeInvest", title: "Merge Investimentos", icon: Briefcase },
  ];
  const [items, _setItems] = useState<SlideOptionsProps["items"]>(options);

  const handleClick = (item: (typeof options)[number]) => {
    if (item.type === "modal") {
      setModalOpenId((current) => (current === item.id ? null : item.id));
    } else if (item.type === "action" && item.action) {
     item.action();
    }
  };

  return (
    <Carousel className="mx-auto  overflow-hidden" opts={{ align: "center" }}>
      <CarouselContent>
        {items?.map((item) => (
          <div key={item.title} className="ml-8 flex flex-col items-center gap-2 basis-[18%]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  onClick={() => handleClick(item)}
                  className={cn(
                    "flex flex-col items-center justify-center w-24 h-24 shrink-0 rounded-full border-2 hover:shadow-md transition-all cursor-pointer gap-2 text-center group hover:bg-card/40",
                    item.highlight && "bg-Destaque/80 text-primary-foreground hover:bg-Destaque/50"
                  )}
                >
                  <item.icon className="w-12 h-12" />
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xl">{item.title}</p>
              </TooltipContent>
            </Tooltip>

            <p className="text-sm text-center">{item.title}</p>

            {item.type === "modal" &&
              item.id &&
              item.modalElement &&
              item.modalElement(modalOpenId === item.id, () => handleClick(item))}
          </div>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
