import axios from "axios";
import { baseURL, handleToken } from "./api";
import { TransactionHistory } from "@/types/transactions";

const transactionsApi = axios.create({
  baseURL: `${baseURL}/transactions`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTransferComprovant = async (transactionId: string): Promise<Blob> => {
  try {
    handleToken(transactionsApi);
    const userResponse = await transactionsApi.get(`/${transactionId}/receipt`, { responseType: "blob" });
    return userResponse.data;
  } catch (err: any) {
    throw err;
  }
};

export const getTransferHistory = async (date?: string): Promise<TransactionHistory> => {
  try {
    handleToken(transactionsApi);
    const response = await transactionsApi.get<TransactionHistory>(`/history${date ? `?date=${date}` : ""}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
