import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { DatePicker } from "@/components/ui/date-picker";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTransfer } from "@/hooks/useTransfer";
import { TransactionHistoryItem } from "@/types/transactions";
import { Skeleton } from "../ui/skeleton";
import { TransferCard } from "@/components/TransferCard/TransferCard";
import { NavigationOff } from "lucide-react";
import { useUserContext } from "@/hooks/useUserContext";

export function HistoryTransferSidebar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [transfers, setTrasnfers] = useState<TransactionHistoryItem[]>([]);
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const { getHistoryTrasfer, loading } = useTransfer();
  const { update } = useUserContext();
 
  const fetchTransfer = async () => {
    const res = await getHistoryTrasfer(dateKey);
    setTrasnfers(res ?? []);
  };


  useEffect(() => {
    fetchTransfer();
  }, [selectedDate, update]);

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
    >
      <SidebarContent className="overflow-hidden flex flex-col ">
        <DatePicker date={selectedDate} setDate={setSelectedDate} />
        <SidebarSeparator className="mx-0 border-b" />

        <div className="p-2 space-y-2 h-full">
          <h4 className="text-sm font-semibold text-muted-foreground">
            {selectedDate
              ? `Movimentações de ${format(selectedDate, "dd 'de' MMMM", {
                  locale: ptBR,
                })}`
              : "Selecione uma data"}
          </h4>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg w-full" />
              ))}
            </div>
          ) : transfers.length > 0 ? (
            <Swiper
              direction={"vertical"}
              slidesPerView={2}
              spaceBetween={20}
              className={`max-h-[25rem] ${
                transfers.length === 1 ? "" : "overflow-hidden"
              } `}
            >
              {transfers.map((t) => (
                <SwiperSlide key={t.id}>
                  <TransferCard item={t} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-sm text-muted-foreground flex flex-col items-center justify-center text-justify mt-4 w-40 mx-auto">
              <NavigationOff />
              Nenhuma movimentação nesta data.
            </p>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
