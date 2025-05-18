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
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { TooltipContent, TooltipTrigger, Tooltip } from "@/components/ui/tooltip";

const options = [
  { title: "Transfer Chell", icon: TerminalSquare, highlight: true },
  { title: "Push Pix", icon: SendHorizontal },
  { title: "Commit Pagamento", icon: CreditCard },
  { title: "Pull Deposito", icon: Banknote },
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
    <Carousel className="mx-auto overflow-hidden" opts={{ align: "center" }}>
      <CarouselContent>
        {items.map((item) => (
          <>
            <CarouselItem className="flex flex-col  items-center gap-2 basis-[18%]" style={{ userSelect: "none", }}>
              <Tooltip>
                <TooltipTrigger className="flex flex-col items-center">
                  <Card
                    key={item.title}
                    className={cn(
                      "flex flex-col items-center justify-center w-24 h-24 shrink-0 rounded-full border-2 hover:shadow-md transition-all cursor-pointer gap-2 text-center group hover:bg-card/40 ",
                      item.highlight && "bg-Destaque/80 text-primary-foreground hover:bg-Destaque/50"
                    )}
                  >
                    <item.icon className="w-12 h-12" />
                  </Card>
                  <p className="text-sm text-center">{item.title}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xl">{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </CarouselItem>
          </>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
