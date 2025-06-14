import { deleteStash, getStashs, postStash, putStashDepositOrLoot, putStashUpdate } from "@/api/stashApi";
import { Stash, StashRequest } from "@/types/stashType";
import { useState } from "react";
import { toast } from "sonner";
import { useUserContext } from "./useUserContext";

export const useStash = () => {
  const [formData, setFormData] = useState<StashRequest>({
    name: "",
    value: 0,
    description: "",
    goal: 0,
  });
  const [loading, setLoading] = useState(false);
  const [modalCreate, setModalCreateOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [modaDeleteConfirmDelete, setModalDeleteConfirm] = useState(false);
  const { handleUpdate } = useUserContext();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const cents = parseInt(raw || "0", 10);
    setFormData((prev) => ({ ...prev, [e.target.id]: cents / 100 }));
  };
  const setFormField = (field: keyof StashRequest, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "value" && typeof value === "string" ? Number(value.replace(/\D/g, "")) / 100 : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        name: formData.name,
        value: formData.value,
        description: formData.description,
        goal: formData.goal,
      };
      const response = await postStash(data);
      if (response) {
        handleModalCreateOpen();
        handleUpdateData();
        toast.success("Caixinha criada com sucesso!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const getUserStashs = async (): Promise<Stash[] | undefined> => {
    setLoading(true);
    try {
      const res = await getStashs();
      return res.content;
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const removeStash = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteStash(id);
      if (res) {
        handleUpdateData();
        handleModalConfirm();
        toast.success("Caixinha excluida com sucesso!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  const handleModalCreateOpen = () => {
    setModalCreateOpen(!modalCreate);
  };
  const handleUpdateData = () => {
    handleUpdate();
    setUpdate(!update);
  };

  const stashDepositOrLoot = async (id: string, type: "deposit" | "loot") => {
    setLoading(true);
    try {
      const res = await putStashDepositOrLoot(id, formData.value!, type);
      if (res) {
        handleUpdateData();
        handleModalCreateOpen();
        toast.success(`${type === "deposit" ? "Deposito" : "Saque"} realizado com sucesso!`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const stashUpdateInfo = async (id: string) => {
    setLoading(true);
    try {
      const data = {
        name: formData.name,
        description: formData.description,
        goal: formData.goal,
      };
      const res = await putStashUpdate(id, data);
      if (res) {
        handleUpdateData();
        handleModalCreateOpen();
        toast.success("Stash atualizada com sucesso!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalConfirm = () => {
    setModalDeleteConfirm(!modaDeleteConfirmDelete);
  };
  return {
    formData,
    handleValueChange,
    setFormField,
    getUserStashs,
    loading,
    handleSubmit,
    modaDeleteConfirmDelete,
    handleModalConfirm,
    stashDepositOrLoot,
    modalCreate,
    handleModalCreateOpen,
    update,
    stashUpdateInfo,
    removeStash,
  };
};
