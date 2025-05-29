import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { balanceFormater } from "../Utils/balanceFormater";
import { Stepper } from "../Stepper";
import { useTransfer } from "@/hooks/useTransfer";
import { IdCard, KeySquare, ScanQrCode, User, Verified, VerifiedIcon } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { Card } from "../ui/card";

const presets = [5, 20, 100];
const steps = [
  { text: "Destinatário", icon: <IdCard size={32} /> },
  { text: "Valor", icon: <Verified size={32} /> },
  { text: "Validação", icon: <ScanQrCode size={32} /> },
  { text: "Senha", icon: <KeySquare size={32} /> },
  { text: "Concluido", icon: <VerifiedIcon size={32} /> },
];

interface PushPixProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export function PushPixModal({ open, setOpen }: PushPixProps) {
  const [step, setStep] = useState(0);
  const {
    formData,
    setFormField,
    validateStep,
    userKey,
    fetchUserByKey,
    // submitTransfer,
    isSubmitting,
    error,
    formattedValue,
    handleValueChange,
  } = useTransfer();

  const next = () => {
    if (validateStep(step)) setStep((prev) => prev + 1);
  };

  const back = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  useEffect(() => {
    setStep(0);
    setFormField("pixKey", "");
  }, [open]);
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <Label htmlFor="pixKey">Digite a chave Pix</Label>
            <Input
              value={formData.pixKey}
              id="pixKey"
              onChange={(e) => {
                setFormField("pixKey", e.target.value);
                fetchUserByKey(e.target.value);
              }}
              required
              placeholder="Email, CPF, Celular ou Aleatória"
            />
            {error.pixKeyError && <span className="text-red-400 text-sm">{error.pixKeyError}</span>}
            {!error.pixKeyError && userKey && (
              <div
                className="bg-gradient-to-r cursor-pointer hover:from-gray-800 hover:scale-105 transition ease-in-out  from-gray-700 via-gray-800 to-gray-900 flex p-5 items-center gap-4 rounded-lg shadow-md"
                onClick={() => {
                  setFormField("pixKey", userKey.userCpf);
                  next();
                }}
              >
                <Avatar className="border-2 border-primary rounded-full p-1">
                  <User size={48} className="text-primary" />
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{userKey.userName}</p>
                  <p className="text-xs text-gray-400">{userKey.accountId.slice(-20).concat("...")}</p>
                </div>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="amount">Digite o valor</Label>
            <Input value={formattedValue} id="amount" onChange={handleValueChange} placeholder="R$ 0,00" />
            <div className="flex gap-2">
              {presets.map((p) => (
                <Badge key={p} onClick={() => setFormField("amount", p)} className="cursor-pointer">
                  {balanceFormater(p)}
                </Badge>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <Card className="mx-auto p-4 w-fit flex items-center justify-center shadow-lg border border-gray-300 rounded-lg">
            <div className="space-y-6 text-base flex flex-col">
              <div className="flex items-center gap-4">
                <Avatar className="border-2 border-primary rounded-full p-1 shadow-sm">
                  <User size={32} className="text-primary" />
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-bold text-lg">{userKey?.userName}</p>
                  <p className="text-gray-500 text-sm">{formData.pixKey}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold">Valor:</p>
                <p className="flex items-center gap-1">
                  <span className="text-primary font-bold text-lg">{balanceFormater(formData.amount || 0)}</span>
                  <span className="text-gray-500 text-xs">BRL</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold">Horário:</p>
                <p className="text-gray-500">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </Card>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="transferPassword">Senha de Transferência</Label>
            <Input
              type="password"
              value={formData.transferPassword}
              id="transferPassword"
              maxLength={6}
              placeholder="******"
              onChange={(e) => setFormField("transferPassword", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">A sua senha de transferência!</p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 text-center">
            <VerifiedIcon size={64} className="text-green-700 mx-auto"/>
            <p className="text-xl font-semibold">Transferência realizada com sucesso!</p>
            <p>
              {balanceFormater(formData.amount || 0)} enviado para {userKey?.userName.split(" ")[0]}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline">Compartilhar</Button>
              <Button variant="outline">Baixar Comprovante</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg md:w-full w-fit h-fit px-12 overflow-y-auto flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Nova Transferência Pix</DialogTitle>
        </DialogHeader>

        <Stepper steps={steps} currentStep={step} />
        <Separator />

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          {renderStep()}
        </form>

        <div className="flex justify-between mt-auto">
          {step < 4 && (
            <Button variant="ghost" disabled={step === 0} onClick={back}>
              Voltar
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button onClick={next} disabled={isSubmitting}>
              Avançar
            </Button>
          ) : null}
          {step > 4 && <Button onClick={() => setStep(0)}>Novo Pix</Button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
