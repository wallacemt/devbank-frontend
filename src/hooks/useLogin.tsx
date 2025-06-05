import { codeValidation, loginCodeResend, loginUser } from "@/api/authApi";
import { SimpleResponse } from "@/types/responses";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUserContext } from "./useUserContext";

export const loginSchema = z.object({
  emailOrCpf: z.string().refine(
    (val: string) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      const isCpf = /^\d{11}$/.test(val.replace(/[^\d]/g, ""));
      return isEmail || isCpf;
    },
    {
      message: "Informe um e-mail ou CPF válido",
    }
  ),
  password: z.string().min(6, "Senha Inválida"),
});

export const codeSchema = z.object({
  email: z.string().email("Email inválido"),
  code: z.string().min(6, "Código Inválido"),
});
type LoginFormData = z.infer<typeof loginSchema>;
type CodeFormData = z.infer<typeof codeSchema>;
export const useLogin = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | undefined>();
  const [reqError, setReqError] = useState<string | undefined>();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrCpf: "",
      password: "",
    },
  });
  const codeForm = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      email: form.getValues().emailOrCpf,
      code: "",
    },
  });
  const { login } = useUserContext();

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    const rawValue = values.emailOrCpf.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawValue);
    const isCpf = /^\d{11}$/.test(rawValue.replace(/[^\d]/g, ""));

    try {
      if (!isEmail && !isCpf) {
        const errorMessage = "Informe um e-mail ou CPF válido";
        form.setError("emailOrCpf", {
          type: "manual",
          message: errorMessage,
        });
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }
      loginSchema.parse(values);
      const response: SimpleResponse = await loginUser(values.emailOrCpf, values.password);
      setMessage(response.message);

      toast.success(response.message);
      setStep(1);
      codeForm.setValue("email", response?.email!);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message;
        form.setError("password", {
          type: "manual",
          message: errorMessage,
        });
        setError(errorMessage);
      } else {
        console.error("Erro inesperado:", error);
        setReqError(error.message);
        setTimeout(() => {
          setReqError("");
        }, 3000);
      }
      toast.error(error.response.data.error)
    } finally {
      setLoading(false);
    }
  };
  const handleCodeVerify = async (code: string) => {
    setLoading(true);
    try {
      setError("");
      codeSchema.parse({ email: emailData.email, code });
      const response = await codeValidation(code, emailData.email);
  
      if (response) {
        toast.success(response.message);
        login(response.token);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message;
        codeForm.setError("code", {
          type: "manual",
          message: errorMessage,
        });
        setError(errorMessage);
      } else {
        console.error("Erro inesperado:", error);
      }
      toast.error(error.response.data.error)
    }finally {
      setLoading(false);
    }
  };

  const resend2FAVerify = async (email: string) => {
    setLoading(true);
    try {
      setError("");
      const response = await loginCodeResend(email);
      if (response) {
        toast.success(response.message);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message;
        codeForm.setError("code", {
          type: "manual",
          message: errorMessage,
        });
        setError(errorMessage);
      } else {
        console.error("Erro inesperado:", error);
      }
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const emailData = useMemo(() => codeForm.getValues(), [codeForm.watch()]);

  return {
    step,
    resend2FAVerify,
    handleLogin,
    form,
    emailData,
    handleCodeVerify,
    error,
    codeForm,
    message,
    loading,
    reqError,
  };
};
