import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sidebar, SidebarContent, SidebarSeparator } from "@/components/ui/sidebar";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface Transfer {
  id: string;
  name: string;
  amount: number;
  type: "sent" | "received";
  time: string;
}

const mockTransfers: Record<string, Transfer[]> = {
  "2025-05-12": [
    { id: "1", name: "João Silva", amount: 120, type: "received", time: "10:30" },
    { id: "2", name: "Maria Costa", amount: 50, type: "sent", time: "14:10" },
    { id: "3", name: "João Silva", amount: 120, type: "received", time: "10:30" },
    { id: "4", name: "Maria Costa", amount: 50, type: "sent", time: "14:10" },
    { id: "5", name: "João Silva", amount: 120, type: "received", time: "10:30" },
    { id: "6", name: "Maria Costa", amount: 50, type: "sent", time: "14:10" },
  ],
  "2025-05-13": [{ id: "3", name: "Carlos Souza", amount: 80, type: "sent", time: "08:15" }],
};

export function HistoryTransferSidebar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [transfers, setTrasnfers] = useState<Transfer[]>([]);
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  useEffect(() => {
    setTrasnfers(mockTransfers[dateKey] || []);
  }, [selectedDate]);

  return (
    <Sidebar collapsible="none" className="sticky top-0 hidden h-svh border-l lg:flex">
      <SidebarContent className="overflow-hidden">
        <DatePicker date={selectedDate} setDate={setSelectedDate} />
        <SidebarSeparator className="mx-0 border-b" />

        <div className="p-2 space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground">
            {selectedDate
              ? `Movimentações de ${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}`
              : "Selecione uma data"}
          </h4>
          {transfers.length > 0 ? (
            <Swiper direction="vertical" slidesPerView={3} spaceBetween={10} mousewheel className="h-[20rem]">
              {transfers.map((t) => (
                <SwiperSlide key={t.id}>
                  <TransferCard {...t} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-sm text-muted-foreground text-justify mt-4  w-40 mx-auto">
              Nenhuma movimentação nesta data.
            </p>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function TransferCard({ name, amount, type, time }: Transfer) {
  return (
    <Card className="shadow-none bg-transparent border-none">
      <CardContent className="flex items-center justify-between p-3 border-b-2 border-gray-500 cursor-pointer hover:scale-105 transition-all">
        <span className=" rounded-full ">
          {type === "sent" ? (
            <BanknoteArrowDown className="text-red-600" size={30} />
          ) : (
            <BanknoteArrowUp className="text-green-600" size={30} />
          )}
        </span>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-xs px-2 py-1 rounded-md",
            type === "sent"
              ? "text-neutral10 border-red-600 bg-Destaque/60"
              : "text-neutral10 border-green-600 bg-green-800"
          )}
        >
          {type === "sent" ? (
            <div className="flex items-center gap-1">- R$ {amount}</div>
          ) : (
            <div className="flex items-center gap-1">+ R$ {amount}</div>
          )}
        </Badge>
      </CardContent>
    </Card>
  );
}
