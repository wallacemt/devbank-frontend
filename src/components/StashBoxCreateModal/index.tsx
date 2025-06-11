import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useTransfer } from "@/hooks/useTransfer";
import { useUserContext } from "@/hooks/useUserContext";
import { balanceFormater } from "@/utils/balanceFormater";
import { StashRequest } from "@/types/stashType";
import { useStash } from "@/hooks/useStash";
import { LoadingBasic } from "../Utils/LoadingBasic";

interface StashBoxModalProps {
  useSth: ReturnType<typeof useStash>;
  initialData?: StashRequest;
  mode: "create" | "update" | "add-amount" | "remove-amount";
}

export function StashBoxModal({ useSth, initialData, mode }: StashBoxModalProps) {
  const { formattedValue } = useTransfer();
  const {
    handleValueChange,
    formData,
    setFormField,
    handleSubmit,
    modalCreate,
    handleModalCreateOpen,
    loading,
    stashDepositOrLoot,
    stashUpdateInfo,
  } = useSth;
  const { user } = useUserContext();
  useEffect(() => {
    if (initialData) {
      setFormField("name", initialData.name);
      setFormField("value", initialData.value);
      setFormField("description", initialData.description || "");
      setFormField("goal", initialData.goal || 0);
    } else {
      setFormField("name", "");
      setFormField("value", 0);
      setFormField("description", "");
      setFormField("goal", 0);
    }
  }, [initialData, open]);

  const handleSubmitByMode = () => {
    if (mode === "create") {
      return handleSubmit();
    } else if (mode === "add-amount") {
      return stashDepositOrLoot(initialData?.id!, "deposit");
    } else if (mode === "remove-amount") {
      return stashDepositOrLoot(initialData?.id!, "loot");
    } else if (mode === "update") {
      return stashUpdateInfo(initialData?.id!);
    }
    return;
  };

  return (
    <Dialog open={modalCreate} onOpenChange={handleModalCreateOpen}>
      <DialogContent className="w-[90%]">
        <DialogHeader>
          <DialogTitle>
            {mode === "update"
              ? "Editar Stash"
              : mode === "add-amount"
              ? "Adicionar Valor"
              : mode === "create"
              ? "Nova Stash"
              : "Retirar Valor"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          {mode !== "add-amount" && mode !== "remove-amount" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormField("name", e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormField("description", e.target.value)}
                  placeholder="Descreva a caixinha"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal">Meta de Valor (opcional)</Label>
                <Input
                  id="goal"
                  value={formattedValue(formData.goal!)}
                  onChange={handleValueChange}
                  placeholder="R$ 0,00"
                />
              </div>
            </>
          )}
          {mode !== "update" && (
            <div className="grid gap-2">
              <Label htmlFor="value">
                {mode === "create" ? "Valor Inicial" : mode === "remove-amount" ? "Retirar" : "Adicionar"}
              </Label>
              <Input
                id="value"
                value={formattedValue(formData.value!)}
                onChange={handleValueChange}
                placeholder="R$ 0,00"
              />
              {mode !== "remove-amount" ? (
                <>
                  {formData.value! > user?.account.balance! && <span className="text-red-500">Saldo Insuficiente</span>}
                  {formData.value! <= user?.account.balance! && (
                    <span className="text-green-500">
                      Valor em conta disponivel: {balanceFormater(user?.account.balance! - formData.value!)}
                    </span>
                  )}
                </>
              ) : (
                <>
                  {mode === "remove-amount" && formData.value! > initialData?.value! && (
                    <span className="text-red-500">Saldo Insuficiente</span>
                  )}
                  {mode === "remove-amount" && formData.value! <= initialData?.value! && (
                    <span className="text-green-500">
                      Valor em stash disponivel: {balanceFormater(initialData?.value! - formData.value!)}
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        {loading ? (
          <LoadingBasic />
        ) : (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" disabled={loading} onClick={handleModalCreateOpen}>
              Cancelar
            </Button>
            <Button onClick={() => handleSubmitByMode()} disabled={loading}>
              {initialData ? "Salvar" : "Criar"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
