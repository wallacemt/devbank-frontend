import { TransactionHistoryItem } from "@/types/transactions";
import { Card, CardContent } from "../ui/card";
import { BanknoteArrowDown, BanknoteArrowUp, Download, Copy, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useTransfer } from "@/hooks/useTransfer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export function TransferCard({ item }: { item: TransactionHistoryItem }) {
  const { direction, outherAccountUsername, timestamp, amount, id } = item;
  const { transferComprovante } = useTransfer();

  const handleDownload = () => {
    transferComprovante(id);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Usuário: ${outherAccountUsername} - R$ ${amount}`);
    toast.success("Informações copiadas!");
  };

  const formattedName = outherAccountUsername.split(" ").slice(0, 2).join(" ");

  const isSent = direction === "SENT";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Card className="bg-background/20 hover:bg-background/80 shadow-none border border-border  transition-all cursor-pointer rounded-xl relative">
          <CardContent
            className="flex  flex-col sm:flex-row justify-between sm:items-center gap-2 p-4 "
            style={{ userSelect: "none" }}
          >
            <div className="flex items-center gap-4 w-full">
              <div
                className={cn(
                  "p-2 rounded-full flex items-center justify-center absolute top-2 right-4",
                  isSent ? "bg-red-100" : "bg-green-100"
                )}
              >
                {isSent ? (
                  <BanknoteArrowDown className="text-red-800" size={24} />
                ) : (
                  <BanknoteArrowUp className="text-green-600" size={24} />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className={cn("text-lg font-bold tracking-tight", isSent ? "text-red-600" : "text-green-600")}>
                  {isSent ? "- " : "+ "}R$ {amount.toLocaleString("pt-BR")}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {isSent ? "Enviado para:" : "Recebido de"} <br /> {formattedName}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {format(new Date(timestamp), "dd MMM yyyy, HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs px-3 py-1 rounded-md",
                  isSent ? "text-red-600 border-red-600" : "text-green-600 border-green-600"
                )}
              >
                {isSent ? "SENT" : "RECEIVED"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </PopoverTrigger>

      <PopoverContent className="w-56" align="end">
        <div className="text-sm font-medium mb-2">Ações disponíveis</div>
        <ul className="space-y-2">
          <li onClick={handleDownload} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer">
            <Download size={16} />
            Baixar comprovante
          </li>
          <li onClick={handleCopy} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer">
            <Copy size={16} />
            Copiar dados
          </li>
          <li className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer">
            <Repeat size={16} />
            Repetir transferência
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
