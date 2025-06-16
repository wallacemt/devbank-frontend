import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Banknote } from "lucide-react";

import { useDeposit } from "@/hooks/useDeposit";
import { useParams } from "react-router";
import { useEffect } from "react";

export default function DepositConfirmationPage() {
  const { id } = useParams();
  const { errorMessage, status, deposit, handleConfirmDeposit, handleGoBack, fetchDeposit } = useDeposit();

  useEffect(() => {
    fetchDeposit(id!);
  }, [id]);

  if (status === "FETCHING") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <Loader2 className="animate-spin w-10 h-10 mb-4" />
        <p>Carregando informações do depósito...</p>
      </div>
    );
  }

  if (status === "ERROR") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500">{errorMessage}</p>
        <Button onClick={handleGoBack} className="mt-4">
          Voltar para Conta
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center space-y-6">
      {status === "PENDING" && deposit && (
        <>
          <Banknote className="w-12 h-12 text-yellow-500" />
          <h2 className="text-2xl font-bold">Confirmar Depósito</h2>
          <p className="text-gray-400">
            Depósito de: <span className="text-yellow-400 font-bold">{`R$ ${deposit.value.toFixed(2)}`}</span>
          </p>
          <Button onClick={() => handleConfirmDeposit(id!)} className="w-full max-w-xs">
            Confirmar Depósito
          </Button>
        </>
      )}

      {status === "PROCESSING" && (
        <>
          <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
          <p>Processando seu depósito...</p>
        </>
      )}

      {status === "COMPLETED" && (
        <>
          <CheckCircle className="w-12 h-12 text-green-500" />
          <h2 className="text-2xl font-bold">Depósito Concluído!</h2>
          <p className="text-gray-400">O valor já foi adicionado à sua conta.</p>
          <Button onClick={handleGoBack} className="w-full max-w-xs">
            Voltar para Conta
          </Button>
        </>
      )}
    </div>
  );
}
