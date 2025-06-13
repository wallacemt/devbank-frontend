import { getAnalisysOverView } from "@/api/analysisApi";
import { useState } from "react";
import { toast } from "sonner";

export const useAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const getOverview = async () => {
    setLoading(true);
    try {
      const res = await getAnalisysOverView();
      return res;
    } catch (err) {
      toast.error("Erro ao carregar historico de transferencias");
    } finally {
      setLoading(false);
    }
  };

  return { getOverview, loading };
};
