import { getUserByKey } from "@/api/transferApi";
import { UserKeyResponse } from "@/types/responses";
import { useState } from "react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userKey, setUserKey] = useState<UserKeyResponse>();
  const [error, setError] = useState({
    pixKeyError: "",
    amountError: "",
    transferPasswordError: "",
  });
  const setFormField = (field: keyof FormData, value: any) => {
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

  const submitTransfer = async () => {
    setIsSubmitting(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsSubmitting(false);
        resolve(true);
      }, 1000);
    });
  };

  const resetTransfer = () => {
    setFormData({
      pixKey: "",
      amount: 0,
      transferPassword: "",
    });
    setIsSubmitting(false);
  };

  const fetchUserByKey = async (userKey: string) => {
    try {
      if (userKey === "") {
        setUserKey(undefined);
        setError({ ...error, pixKeyError: "" });
        return;
      }
      const response = await getUserByKey(userKey);
      setError({ ...error, pixKeyError: "" });
      return setUserKey(response);
    } catch (error: any) {
      setError({ ...error, pixKeyError: error.response.data.error });
      return null;
    }
  };

  const getRecipientName = () => {
    return userKey?.userName;
  };

  return {
    formData,
    setFormField,
    error,
    handleValueChange,
    formattedValue,
    validateStep,
    submitTransfer,
    userKey,
    fetchUserByKey,
    isSubmitting,
    resetTransfer,
    getRecipientName,
  };
}
