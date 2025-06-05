import { useEffect, useState } from "react";
import { TransactionHistoryItem } from "@/types/transactions";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { TransferCard } from "@/components/HistoryTransfer/TransferCard";
import { DatePicker } from "@/components/ui/date-picker";
import { Sidebar } from "@/components/Sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import { useTransfer } from "@/hooks/useTransfer";
import { NavigationOff, SearchIcon } from "lucide-react";
import { TransferCardSkeleton } from "@/components/HistoryTransfer/TransferCardSkeleton";

export default function TransferHistoryPage() {
  const [history, setHistory] = useState<TransactionHistoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const { getHistoryTrasfer, loading } = useTransfer();

  useEffect(() => {
    const fetchTransfer = async () => {
      const res = await getHistoryTrasfer(dateKey);
      setHistory(res ?? []);
    };
    fetchTransfer();
  }, [selectedDate]);

  const filteredHistory = history.filter((t) => t.outherAccountUsername.toLowerCase().includes(search.toLowerCase()));

  return (
    <Sidebar>
      <SiteHeader title="Histórico de Transferências" context="outher" />
      <div className="flex flex-1 flex-col overflow-hidden px-4 md:px-8 pb-6">
        <div className="w-full max-w-3xl mx-auto">
          {/* Filtros */}
          <div className="flex !flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative  w-full sm:max-w-sm">
              <SearchIcon className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Buscar por nome..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="w-fit mx-auto">
              <DatePicker date={selectedDate} setDate={setSelectedDate} />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Histórico */}
          {loading ? (
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <TransferCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredHistory.length > 0 ? (
            <div className="space-y-4 max-h-[20rem] overflow-y-auto pr-1">
              {filteredHistory.map((t) => (
                <TransferCard key={t.id} item={t} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center mt-10 text-muted-foreground text-center text-sm">
              <NavigationOff className="mb-2" />
              Nenhuma movimentação encontrada.
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
