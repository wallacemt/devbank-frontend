import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { balanceFormater } from "../Utils/balanceFormater";
import { Stepper } from "../Stepper";
import { useTransfer } from "@/hooks/useTransfer";
import { IdCard, KeySquare, Loader2, ScanQrCode, User, Verified, VerifiedIcon } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { Card } from "../ui/card";
import { Carousel, CarouselContent } from "../ui/carousel";
import { OverlayTransferFeedback } from "./OverlayTransferFeedback";
import Aos from "aos";
import { useDebounce } from "@/hooks/useDebounce";

const presets = [2, 5, 10, , 50, 100, 200];
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
  const {
    formData,
    setFormField,
    step,
    setStep,
    next,
    back,
    userKey,
    fetchUserByKey,
    submitTransfer,
    loading,
    error,
    formattedValue,
    isCompleted,
    handleValueChange,
    resetTransfer,
    transferComprovante,
    tId,
  } = useTransfer();
  useEffect(() => {
    resetTransfer();
    Aos.init({ duration: 1500 });
  }, [open]);

  const debouncedKey = useDebounce(formData.pixKey, 500);

  useEffect(() => {
    fetchUserByKey(debouncedKey);
  }, [debouncedKey]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <Label htmlFor="pixKey">Digite a chave Pix</Label>
            <Input
              value={formData.pixKey}
              id="pixKey"
              onChange={(e) => setFormField("pixKey", e.target.value)}
              required
              defaultValue={formData.pixKey}
              placeholder="Email, CPF, Celular ou Aleatória"
            />
            {!loading && error.pixKeyError && <p className="text-red-500 text-sm">{error.pixKeyError}</p>}
            {loading && (
              <div className="flex flex-col justify-center items-center rounded-lg mt-4">
                <Loader2 className="animate-spin text-primary mb-2" size={36} />
                <p className="text-sm text-muted-foreground animate-pulse">Buscando conta Pix...</p>
              </div>
            )}
            {!loading && userKey && (
              <div
                className="bg-gradient-to-r cursor-pointer hover:from-gray-800 hover:scale-105 transition ease-in-out from-gray-700 via-gray-800 to-gray-900 flex p-5 items-center gap-4 rounded-lg shadow-md mt-2"
                onClick={() => {
                  setFormField("pixKey", userKey.referenceKey);
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
          <div className="space-y-4" data-aos="fade-right">
            <Label htmlFor="amount">Digite o valor</Label>
            <Input value={formattedValue} id="amount" onChange={handleValueChange} placeholder="R$ 0,00" />
            <Carousel>
              <CarouselContent>
                {presets.map((p) => (
                  <Badge
                    key={p}
                    onClick={() => setFormField("amount", p)}
                    style={{ userSelect: "none" }}
                    className="basis-[16%] ml-5  cursor-pointer"
                  >
                    {balanceFormater(p!)}
                  </Badge>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        );

      case 2:
        return (
          <Card
            className="mx-auto p-4 w-fit flex items-center justify-center shadow-lg border border-gray-300 rounded-lg"
            data-aos="fade-up"
          >
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
          <div className="space-y-4" data-aos="fade-left">
            <Label htmlFor="transferPassword">Senha de Transferência</Label>
            <Input
              type="password"
              value={formData.transferPassword}
              id="transferPassword"
              maxLength={6}
              placeholder="******"
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                setFormField("transferPassword", numericValue);
              }}
            />
            <p className="text-xs text-muted-foreground">A sua senha de transferência!</p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <VerifiedIcon size={64} className="text-green-700 mx-auto" />
            <p className="text-xl font-semibold">Transferência realizada com sucesso!</p>
            <p>
              {balanceFormater(formData.amount || 0)} enviado para{" "}
              <span className="font-semibold text-DarkA1">{userKey?.userName.split(" ")[0]}</span>
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="outline"
                className="w-full hover:scale-105 hover:bg-secundaria"
                onClick={() => transferComprovante(tId)}
                disabled={loading}
              >
                Baixar Comprovante
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-[90%] md:w-full h-fit px-12 overflow-y-auto flex flex-col gap-4">
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
            <Button variant="ghost" disabled={step === 0 || loading || isCompleted} onClick={back}>
              Voltar
            </Button>
          )}
          {step < steps.length - 1 && step !== 3 && (
            <Button onClick={next} disabled={loading}>
              Avançar
            </Button>
          )}
          {(step === 3 || step === 4) && loading && (
            <OverlayTransferFeedback userName={userKey?.userName} type={step === 3 ? "pix" : "comprovante"} />
          )}

          {step === 3 && (
            <Button
              onClick={() => {
                submitTransfer({
                  pixKey: formData.pixKey,
                  amount: formData.amount,
                  password: formData.transferPassword,
                });
              }}
              disabled={loading}
            >
              Enviar
            </Button>
          )}
          {step === 4 && (
            <Button disabled={loading} className="w-full hover:scale-105" onClick={() => resetTransfer()}>
              Novo Pix
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
