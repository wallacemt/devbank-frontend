import { useState } from "react";
import { z } from "zod";

// Esquemas de validação com Zod
const personalInfoSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  cpf: z.string().min(11, "CPF inválido").max(14),
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
  const [data, setData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    code: "",
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (step) => {
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


    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return {
    data,
    errors,
    updateField,
    validateStep,
  };
};
