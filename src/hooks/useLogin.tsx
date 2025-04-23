import { useState } from "react";
import { z } from "zod";

export const useLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    code: "",
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});

  const passwordSchema = z.string().min(6, "Senha Inválida");
  const emailSchema = z.string().email("Email inválido");
  const codeSchema = z.string().min(6, "Código inválido");

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));

    if (field === "email") {
      const result = emailSchema.safeParse(value);
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          [field]: result.error.errors[0].message,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    } else if (field === "password") {
      const result = passwordSchema.safeParse(value);
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          [field]: result.error.errors[0].message,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    } else if (field === "code") {
      const result = codeSchema.safeParse(value);
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          [field]: result.error.errors[0].message,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    }
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (step === 0) {
      setStep(1);
    }
  }

  return {
    data,
    errors,
    step,
    handleLogin,
    updateField,
  };
};
