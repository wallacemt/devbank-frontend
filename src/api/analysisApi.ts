import axios from "axios";
import { baseURL, handleToken } from "./api";
import { AnalysisOverview } from "@/types/analysis";

const analisysApi = axios.create({
  baseURL: `${baseURL}/analysis`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAnalisysOverView = async (): Promise<AnalysisOverview[]> => {
  handleToken(analisysApi);
  const response = await analisysApi.get<AnalysisOverview[]>("/overview");
  return response.data;
};
