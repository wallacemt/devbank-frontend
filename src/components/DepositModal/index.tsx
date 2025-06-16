import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QRCode from "react-qr-code";
import { useDeposit } from "@/hooks/useDeposit";
import { Link } from "react-router";

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ open, onClose }) => {
  const {
    step,
    setStep,
    value,
    setValue,
    method,
    setMethod,
    depositId,
    setDepositId,
    qrCodeLink,
    formattedValue,
    setQrCodeLink,
    loading,
    handleValueChange,
    createDeposit,
  } = useDeposit();

  const handleNextStep = () => {
    if (step === "VALUE") setStep("METHOD");
    else if (step === "METHOD") createDeposit();
  };

  const resetModal = () => {
    setStep("VALUE");
    setValue(0);
    setMethod("PIX");
    setDepositId(null);
    setQrCodeLink(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={resetModal}>
      <DialogContent className="max-w-md bg-principal rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Depositar Saldo</DialogTitle>
        </DialogHeader>

        {step === "VALUE" && (
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Digite o valor que deseja depositar:</p>
            <Input
              value={formattedValue(value)}
              id="amount"
              onChange={(e) => handleValueChange(e)}
              placeholder="Ex: R$100,00"
            />
          </div>
        )}

        {step === "METHOD" && (
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Escolha o método de depósito:</p>
            <RadioGroup value={method} onValueChange={(val) => setMethod(val as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PIX" id="pix" />
                <label htmlFor="pix" className="text-sm">
                  Pix
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="QR" id="qr" />
                <label htmlFor="qr" className="text-sm">
                  QR Code
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="BOLETO" id="boleto" />
                <label htmlFor="boleto" className="text-sm">
                  Boleto
                </label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === "SUMMARY" && depositId && (
          <div className="space-y-4 text-center">
            <p className="text-gray-400 text-sm">Seu depósito está pendente.</p>
            {qrCodeLink && (
              <div className="flex justify-center bg-white p-4 rounded">
                <QRCode value={qrCodeLink} size={180} />
              </div>
            )}

            <p className="text-xs text-gray-500 mt-2">
              Escaneie o QR code ou Acesse:
              <br />
              <Link to={`${window.location.origin}/deposit/${depositId}`} target="_blank">
                <span className="text-yellow-400">{`${window.location.origin}/deposit/${depositId}`}</span>
              </Link>
            </p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center p-4">
            <span className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
          </div>
        )}

        {step !== "SUMMARY" && !loading && (
          <DialogFooter>
            <Button onClick={handleNextStep} className="w-full bg-yellow-400 text-black font-bold hover:bg-yellow-500">
              Avançar
            </Button>
          </DialogFooter>
        )}

        {step === "SUMMARY" && (
          <DialogFooter>
            <Button onClick={resetModal} className="w-full bg-gray-800 text-gray-200 hover:bg-gray-700">
              Fechar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
