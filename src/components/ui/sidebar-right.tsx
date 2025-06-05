import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { DatePicker } from "@/components/ui/date-picker";
import { Sidebar, SidebarContent, SidebarSeparator } from "@/components/ui/sidebar";
import { TransactionHistoryItem } from "@/types/transactions";
import { format } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTransfer } from "@/hooks/useTransfer";
import { NavigationOff } from "lucide-react";
import { TransferCard } from "../HistoryTransfer/TransferCard";
import { TransferCardSkeleton } from "../HistoryTransfer/TransferCardSkeleton";

export function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [transfers, setTrasnfers] = useState<TransactionHistoryItem[]>([]);
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const { getHistoryTrasfer, loading } = useTransfer();
  useEffect(() => {
    const fetchTransfer = async () => {
      const res = await getHistoryTrasfer(dateKey);
      setTrasnfers(res ?? []);
    };

    fetchTransfer();
  }, [selectedDate]);

  return (
    <Sidebar collapsible="none" className="sticky top-0 hidden h-svh border-l lg:flex" {...props}>
      <SidebarContent className="overflow-hidden flex flex-col ">
        <DatePicker date={selectedDate} setDate={setSelectedDate} />
        <SidebarSeparator className="mx-0 border-b" />

        <div className="p-2 space-y-2 h-full">
          <h4 className="text-sm font-semibold text-muted-foreground">
            {selectedDate
              ? `Movimentações de ${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}`
              : "Selecione uma data"}
          </h4>
          {loading ? (
            <div className="space-y-12">
              {Array.from({ length: 2 }).map((_, i) => (
                <TransferCardSkeleton key={i} />
              ))}
            </div>
          ) : transfers.length > 0 ? (
            <Swiper
              direction={"vertical"}
              slidesPerView={2}
              spaceBetween={20}
              className={`max-h-[25rem] ${transfers.length === 1 ? "" : "overflow-hidden"} `}
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
