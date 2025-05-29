import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  SendHorizontal,
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
import { useState } from "react";


interface SlideOptionsProps {
  items?: {
    id: string;
    title: string;
    icon: LucideIcon;
    highlight?: boolean;
    modal?: any;
  }[];
}

const options = [
  { id: "transferChell", title: "Transfer Chell", icon: TerminalSquare, highlight: true },
  {
    id: "pushPix", title: "Push Pix", icon: SendHorizontal, modal: (open: boolean, setOpen: (open: boolean) => void) => (
      <PushPixModal open={open} setOpen={setOpen} />
    ),
  },
  { id: "commitPagamento", title: "Commit Pagamento", icon: CreditCard },
  { id: "pullDeposito", title: "Pull Deposito", icon: Banknote },
  { id: "stashCaixa", title: "Stash Caixinha", icon: Coins },
  { id: "deployRecarga", title: "Deploy Recarga", icon: Smartphone },
  { id: "forkEmprestimo", title: "Fork Empréstimo", icon: DollarSign },
  { id: "mergeInvest", title: "Merge Investimentos", icon: Briefcase },
];
export function SlideOptions({ items = options }: SlideOptionsProps) {
  const [modalOpenId, setModalOpenId] = useState<string | null>(null);

  const handleOpen = (id: string | undefined) => {
    if (!id) return;
    setModalOpenId((current) => (current === id ? null : id));
  };
  return (
    <Carousel className="mx-auto  overflow-hidden" opts={{ align: "center" }}>
      <CarouselContent>
        {items.map((item) => (
          <div key={item.title} className="ml-8 flex flex-col items-center gap-2 basis-[18%]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  onClick={() => handleOpen(item.id)}
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

            {item.modal &&
              item.id &&
              item.modal(modalOpenId === item.id, (open: any) =>
                setModalOpenId(open ? item.id : null)
              )}
          </div>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
