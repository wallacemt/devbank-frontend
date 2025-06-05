import { getUserByKey, postPixTransfer } from "@/api/transferApi";
import { UserKeyResponse } from "@/types/responses";
import { useState } from "react";
import { toast } from "sonner";
import { useUserContext } from "./useUserContext";
import { getTransferComprovant, getTransferHistory } from "@/api/transactionsApi";
import { TransactionHistoryItem } from "@/types/transactions";

type FormData = {
  pixKey: string;
  amount: number;
  transferPassword: string;
};

export function useTransfer() {
  const [formData, setFormData] = useState<FormData>({
    pixKey: "",
    amount: 0,
    transferPassword: "",
  });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tId, settId] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [userKey, setUserKey] = useState<UserKeyResponse>();
  const [error, setError] = useState({
    pixKeyError: "",
    amountError: "",
    transferPasswordError: "",
  });
  const { handleUpdate } = useUserContext();
  const next = () => {
    if (validateStep(step)) setStep((prev) => prev + 1);
  };

  const back = () => {
    if (step > 0) {
      resetError();
      setStep((prev) => prev - 1);
    }
  };
  const setFormField = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "amount" && typeof value === "string" ? Number(value.replace(/\D/g, "")) / 100 : value,
    }));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const cents = parseInt(raw || "0", 10);
    setFormData((prev) => ({ ...prev, amount: cents / 100 }));
  };

  const formattedValue = formData.amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        setError({ ...error, pixKeyError: "Digite uma chave Pix válida" });
        return formData.pixKey.length >= 4;
      case 1:
        return formData.amount > 0;
      case 2:
        return true;
      case 3:
        return /^\d{6}$/.test(formData.transferPassword) && !/(.)\1{2,}/.test(formData.transferPassword);
      default:
        return true;
    }
  };

  const submitTransfer = async ({ pixKey, amount, password }: { pixKey: string; amount: number; password: string }) => {
    setLoading(true);
    try {
      const response = await postPixTransfer(amount.toString(), pixKey, password);
      if (response) {
        handleUpdate();
        toast.success(response.message);
        settId(response.transactionId);
        setIsCompleted(true);
        setStep(4);
      }
    } catch (err: any) {
      console.error(err);
      return toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const resetTransfer = () => {
    setLoading(false);
    setStep(0);
    resetData();
    resetError();
    setUserKey(undefined);
  };

  const resetError = () => {
    return setError({
      pixKeyError: "",
      amountError: "",
      transferPasswordError: "",
    });
  };
  const resetData = () => {
    setFormData({
      pixKey: "",
      amount: 0,
      transferPassword: "",
    });
  };
  const fetchUserByKey = async (userKeyValue: string) => {
    if (userKeyValue.trim() === "") return;
    setLoading(true);
    try {
      const response = await getUserByKey(userKeyValue.trim());
      setUserKey(response);
      setError((prev) => ({ ...prev, pixKeyError: "" }));
    } catch (error: any) {
      setError((prev) => ({ ...prev, pixKeyError: error?.response?.data?.error || "Erro ao buscar chave" }));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const transferComprovante = async (transactionId: string) => {
    setLoading(true);
    try {
      const promise = toast.promise(getTransferComprovant(transactionId), {
        loading: "Gerando comprovante",
        success: "Comprovante gerado com sucesso",
      });
      const pdfBlob = await promise.unwrap();
      const url = window.URL.createObjectURL(pdfBlob);
      window.open(url, "_blank");
    } catch (err: any) {
      console.error(err);
      return toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const getHistoryTrasfer = async (date?: string): Promise<TransactionHistoryItem[] | undefined> => {
    setLoading(true);
    try {
      const res = await getTransferHistory(date);
      return res.content;
    } catch (err) {
      toast.error("Erro ao carregar historico de transferencias");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormField,
    getHistoryTrasfer,
    error,
    transferComprovante,
    handleValueChange,
    formattedValue,
    validateStep,
    submitTransfer,
    userKey,
    fetchUserByKey,
    loading,
    resetTransfer,
    step,
    setStep,
    next,
    back,
    tId,
    isCompleted,
  };
}
