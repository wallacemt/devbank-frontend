import {
  deleteCard,
  getCards,
  getPreApprovedLimit,
  postAddCard,
  postGenerateCardWithAprrovedLimit,
} from "@/api/cardApi";
import { Card, RequestAddCard } from "@/types/cards";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Code, LockKeyhole, Terminal } from "lucide-react";
import { useUserContext } from "./useUserContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const addCardSchema = z.object({
  cardHolderName: z.string().min(3, "Nome do titular deve ter pelo menos 3 caracteres"),
  cardTitle: z.string().min(3, "Título do cartão deve ter pelo menos 3 caracteres"),
  expiryDate: z.string().min(3, "Data de expiração do cartão deve ter pelo menos 3 caracteres"),
  number: z.string().min(3, "Número do cartão deve ter pelo menos 3 caracteres"),
  cvv: z.string().min(3, "CVV do cartão deve ter pelo menos 3 caracteres"),
});

type AddCardSchema = z.infer<typeof addCardSchema>;
export const useCard = () => {
  const [loading, setLoading] = useState(false);
  const features = [
    {
      icon: <Code />,
      color: "bg-blue-100 text-blue-700",
      title: "Cashback em código",
      desc: "Ganhe até 5% de cashback em compras na AWS, GitHub e outras plataformas de dev.",
    },
    {
      icon: <LockKeyhole />,
      color: "bg-purple-100 text-purple-700",
      title: "Segurança máxima",
      desc: "Controle total do seu cartão via API, com possibilidade de gerar cartões virtuais únicos.",
    },
    {
      icon: <Terminal />,
      color: "bg-green-100 text-green-700",
      title: "Integração CLI",
      desc: "Gerencie seu cartão direto do terminal com nossa CLI oficial.",
    },
  ];
  const { user } = useUserContext();
  const formData = useForm<AddCardSchema>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      cardHolderName: user?.name.toUpperCase() || "",
      cardTitle: "",
      expiryDate: "",
      number: "",
      cvv: "",
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = formData;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [update, setUpdate] = useState(false);

  const [openAddCard, setOpenAddCard] = useState(false);

  const [modalAdquireCard, setModalAdquireCard] = useState(false);

  const updateField = (field: keyof AddCardSchema, value: any) => {
    setValue(field, value);
  };

  const getCardList = async (): Promise<Card[] | undefined> => {
    setLoading(true);
    try {
      return await getCards();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const getApprovedLimit = async (): Promise<{ limit: number } | undefined> => {
    setLoading(true);
    try {
      return await getPreApprovedLimit();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const postAdiquireDevCard = async (): Promise<Card | undefined> => {
    setLoading(true);
    try {
      const res = await postGenerateCardWithAprrovedLimit(selectedDate?.getDate().toString()!);
      if (res) {
        setModalAdquireCard(false);
        setUpdate(!update);
        return;
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const addData: RequestAddCard = {
      cardHolderName: watch("cardHolderName"),
      cardTitle: watch("cardTitle"),
      expiryDate: watch("expiryDate").replace("-", "/"),
      number: watch("number").split(" ").join(""),
      cvv: watch("cvv"),
    };
    try {
      const res = await postAddCard(addData);
      if (res) {
        setUpdate(!update);
        toast.success("Cartão Adicionado com sucesso!");
        setOpenAddCard(!openAddCard);
        return;
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const removeCard = async (id: string) => {
    try {
      const res = await deleteCard(id);
      if (res) {
        toast.success("Cartão removido com sucesso!");
        setUpdate(!update);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return {
    getCardList,
    getApprovedLimit,
    loading,
    updateField,
    selectedDate,
    setSelectedDate,
    postAdiquireDevCard,
    handleAddCard,
    update,
    features,
    register,
    modalAdquireCard,
    setModalAdquireCard,
    setOpenAddCard,
    openAddCard,
    handleSubmit,
    errors,
    removeCard,
  };
};
