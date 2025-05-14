import { emailOrCpfValidation, registerCodeVerify, registerEmailSendOrResend, registerUser } from "@/api/authApi";
import { cpfVerify, emailVerify } from "@/components/Utils/verifications";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useNavigate } from "react-router";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const emailOrCpfVerify = async (emailOrCpf: string) => {
    setErrors("");
    try {
      const response = await emailOrCpfValidation(emailOrCpf);
      if (response) {
        return response;
      }
    } catch (error: any) {
      setErrors({
        emailOrCpf: "Email Ou Cpf Já em uso.",
      });
    } finally {
      setLoading(false);
    }
  };

  const validations = (data: string, type: string) => {
    setErrors("");
    if (type === "email") {
      emailVerify(data);
      if (!emailVerify(data)) {
        setErrors({
          email: "Email inválido",
        });
      }
    } else if (type === "cpf") {
      cpfVerify(data);
      if (!cpfVerify(data)) {
        setErrors({
          cpf: "Cpf inválido",
        });
      }
    }
  };

  const nextStep = async () => {
    setLoading(true);
    try {
      const response = await registerEmailSendOrResend(data.name, data.email);
      if (response) {
        toast.success(response.message);
        setStep(1);
      }
    } catch (error: any) {
      console.error("Erro inesperado:", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const resendVerifyEmail = async () => {
    setLoading(true);
    try {
      const response = await registerEmailSendOrResend(data.name, data.email, true);
      if (response) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.error("Erro inesperado:", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      const response = await registerCodeVerify(data.email, data.code);
      if (response) {
        toast.success(response.message);
        setStep(2);
      }
    } catch (error: any) {
      console.error("Erro inesperado:", error);
      toast.error(error.response.data.error);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await registerUser(data.name, data.cpf, data.email, data.password, data.confirmPassword);
      if (response) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Erro inesperado:", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    errors,
    loading,
    handleRegister,
    validations,
    updateField,
    validateStep,
    resendVerifyEmail,
    step,
    emailOrCpfVerify,
    verifyCode,
    nextStep,
  };
};
