import { useState } from "react";
import { z } from "zod";

// Esquemas de validação com Zod
const personalInfoSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  cpf: z
    .string()
    .min(11, { message: "Preencha o campo com seu CPF" })
    .max(11, { message: "O CPF deve conter exatamente 11 caracteres" })
    .regex(/^[0-9]+$/, { message: "O CPF deve conter apenas números" }),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const useRegister = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    code: "",
  });

  const [errors, setErrors] = useState<any>({});

  const updateField = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (step: string) => {
    let result;
    if (step === "personal") {
      result = personalInfoSchema.safeParse({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
      });
    } else if (step === "password") {
      result = passwordSchema.safeParse({
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    }

    if (!result?.success) {
      const fieldErrors: any = {};
      result?.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const resendVerifyEmail = () => {
    console.log("resendVerifyEmail");
  };
  return {
    data,
    errors,
    updateField,
    validateStep,
    resendVerifyEmail,
    step,
  };
};
