import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { DatePicker } from "@/components/ui/date-picker";
import { Sidebar, SidebarContent, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { TransactionHistoryItem } from "@/types/transactions";
import { format } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTransfer } from "@/hooks/useTransfer";
import { NavigationOff } from "lucide-react";
import { TransferCard } from "@/components/Utils/TransferCard/TransferCard";
import { TransferCardSkeleton } from "@/components/Utils/TransferCard/TransferCardSkeleton";
import { useUserContext } from "@/hooks/useUserContext";

export function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [transfers, setTrasnfers] = useState<TransactionHistoryItem[]>([]);
  const { update } = useUserContext();
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const { getHistoryTrasfer, loading } = useTransfer();
  useEffect(() => {
    const fetchTransfer = async () => {
      const res = await getHistoryTrasfer(dateKey);
      console.log(res);
      setTrasnfers(res ?? []);
    };

    fetchTransfer();
  }, [selectedDate, update]);

  return (
    <Sidebar collapsible="none" className="hidden lg:flex lg:h-screen m-1 p-1 rounded-xl" {...props}>
      <SidebarContent className="overflow-auto flex flex-col ">
        <SidebarHeader>
          <h2 className="lg:text-xl font-semibold text-muted-foreground text-center font-principal">Movimentações</h2>
        </SidebarHeader>
        <DatePicker date={selectedDate} setDate={setSelectedDate} />
        <SidebarSeparator className="mx-0 border-b border-white/30" />
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
              slidesPerView={transfers.length <= 1 ? 1 : 2}
              spaceBetween={20}
              className={`max-h-[26rem] overflow-hidden`}
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
