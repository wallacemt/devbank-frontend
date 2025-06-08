import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const pixMesages = [
  "Verificando saldo...",
  "Autenticando dados...",
  "Enviando para o destinatário...",
  "Transferência em andamento...",
  "Aguarde um instante...",
];

const comprovanteMessages = [
  "Gerando PDF...",
  "Baixando comprovante",
  "Aguarde um instante...",
];
interface OverlayTransferFeedbackProps {
  userName?: string;
  type: "pix" | "comprovante";
}

export function OverlayTransferFeedback({ userName, type = "pix" }: OverlayTransferFeedbackProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const transferMessages = type === "pix" ? pixMesages : comprovanteMessages;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % transferMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col justify-center items-center rounded-lg">
      <Loader2 className="animate-spin text-primary mb-4" size={48} />
      <p className="text-lg font-medium text-center animate-pulse px-4">
        {transferMessages[currentMessageIndex].replace("o destinatário", userName ?? "o destinatário")}
      </p>
    </div>
  );
}
