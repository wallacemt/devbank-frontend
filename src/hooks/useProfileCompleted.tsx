import { postProfie, postReclaimBonus } from "@/api/userApi";
import { UserProfileRequest } from "@/types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUserContext } from "./useUserContext";

const profileSchema = z.object({
  cep: z.string().min(8, { message: "CEP inválido, deve conter exatamente 8 caracteres" }),
  street: z.string().min(3, { message: "Rua inválida, deve conter pelo menos 3 caracteres" }),
  number: z.string().min(1, { message: "Número inválido, deve ser maior que 0" }),
  complement: z.string().optional(),
  city: z.string().min(3, { message: "Cidade inválida, deve conter pelo menos 3 caracteres" }),
  state: z.string().min(2, { message: "Estado inválido, deve conter pelo menos 2 caracteres" }),
  socialName: z.string().optional(),
  birthDate: z.string().refine((date) => new Date(date) >= new Date(), {
    message: "Data de nascimento inválida, deve ser uma data no passado",
  }),
  gender: z.string().min(1, "Genero inválido!"),
  maritalStatus: z.string().min(1, "Estado civil inválido!"),
  income: z.string().min(1, "Rendimento inválido!"),
  employmentStatus: z.string().min(1, "Situação inválido!"),
  occupation: z.string().min(1, "Profissão inválida"),
  company: z.string().min(1, "Empresa inválida"),
  education: z.string().min(1, "Escolaridade inválida"),
  transactionPin: z.string().regex(/^\d{6}$/, { message: "A senha deve conter exatamente 6 dígitos numéricos" }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm() {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      cep: "",
      street: "",
      number: "0",
      complement: "",
      city: "",
      state: "",
      socialName: "",
      birthDate: new Date().toString(),
      gender: "",
      maritalStatus: "",
      income: "0",
      employmentStatus: "",
      occupation: "",
      company: "",
      education: "",
      transactionPin: "",
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(false);
  const { handleUpdate, handleView } = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof ProfileFormData, value: any) => {
    if (field === "cep") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 8);
      setValue("cep", onlyDigits);

      if (onlyDigits.length === 8) {
        fetchAddressByCep(onlyDigits);
      }
      return;
    }
    setValue(field, value);
  };

  const fetchAddressByCep = async (cep: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setValue("street", data.logradouro || "");
        setValue("city", data.localidade || "");
        setValue("state", data.uf || "");
        form.setError("cep", { type: "manual", message: "" });
      } else {
        form.setError("cep", { type: "manual", message: "CEP inválido" });
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReclaimBonus = async () => {
    setLoading(true);
    try {
      const promise = toast.promise(postReclaimBonus(), {
        loading: "Resgatando bonus",
        success: "Bonus resgatado, use com sabedoria!",
      });
      const response = await promise.unwrap();

      if (response) {
        setOpen(!open);
        handleUpdate();
        handleView();
      }
      return response;
    } catch (error: any) {
      console.error(error);
      return toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleConpleteProfile = async (e: React.FormEvent, values: z.infer<typeof profileSchema>) => {
    e.preventDefault();
    setLoading(true);
    try {
      profileSchema.parse(values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message;
        toast.error(errorMessage);
        return;
      }
    }
    const data: UserProfileRequest = values;
    try {
      const promise = toast.promise(postProfie(data), {
        loading: "Atualizando perfil",
        success: "Perfil atualizado",
      });

      const response = await promise.unwrap(); 

      if (response) {
        await handleReclaimBonus(); 
      }

      return response;
    } catch (error: any) {
      console.error(error);
      return toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cep = watch("cep");
    if (cep?.length === 8) fetchAddressByCep(cep);
  }, [watch("cep")]);

  return {
    register,
    form,
    handleSubmit,
    handleChange,
    handleConpleteProfile,
    visible,
    setVisible,
    errors,
    watch,
    loading,
    open,
    setOpen,
    setValue,
  };
}
