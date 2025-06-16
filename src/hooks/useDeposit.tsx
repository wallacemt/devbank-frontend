import { getDepositById, postConfirmDeposit, postDeposit } from "@/api/depositApi";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useUserContext } from "./useUserContext";

type DepositStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "ERROR" | "FETCHING";
interface DepositDetails {
  id: string;
  value: number;
}
type Step = "VALUE" | "METHOD" | "SUMMARY" | "LOADING";
export const useDeposit = () => {
  const { handleUpdate } = useUserContext();
  const [step, setStep] = useState<Step>("VALUE");
  const [value, setValue] = useState<number>(0);
  const [method, setMethod] = useState<"PIX" | "BOLETO" | "QR">("PIX");
  const [depositId, setDepositId] = useState<string | null>(null);
  const [qrCodeLink, setQrCodeLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<DepositStatus>("FETCHING");
  const [deposit, setDeposit] = useState<DepositDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useNavigate();
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const cents = parseInt(raw || "0", 10);
    setValue(cents / 100);
  };
  const createDeposit = async () => {
    setLoading(true);
    try {
      const response = await postDeposit(value);
      setDepositId(response.depositId);
      setQrCodeLink(response.qrCodeUrl);
      setStep("SUMMARY");
    } catch (err) {
      toast.error("Erro ao carregar historico de transferencias");
    } finally {
      setLoading(false);
    }
  };
  const formattedValue = (amount: number) => {
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  async function fetchDeposit(id: string) {
    setStatus("FETCHING");
    try {
      const response = await getDepositById(id!);
      setDeposit(response);
      setStatus(response.depositStatus);
    } catch (error) {
      setStatus("ERROR");
      setErrorMessage("Não foi possível carregar os dados do depósito.");
    }
  }

  async function handleConfirmDeposit(id: string) {
    setStatus("PROCESSING");
    try {
      const res = await postConfirmDeposit(id);
      if (res) {
        setStatus("COMPLETED");
        toast.success(res.message);
        handleUpdate();
      }
    } catch (error) {
      setStatus("ERROR");
      setErrorMessage("Ocorreu um erro ao processar o depósito.");
    }
  }

  function handleGoBack() {
    router("/dashboard");
  }
  return {
    step,
    formattedValue,
    setStep,
    value,
    setValue,
    method,
    setMethod,
    depositId,
    setDepositId,
    qrCodeLink,
    handleValueChange,
    setQrCodeLink,
    loading,
    setLoading,
    createDeposit,
    handleGoBack,
    errorMessage,
    setErrorMessage,
    deposit,
    setDeposit,
    status,
    setStatus,
    fetchDeposit,
    handleConfirmDeposit,
  };
};
