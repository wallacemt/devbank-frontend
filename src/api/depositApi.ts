import axios from "axios";
import { baseURL, handleToken } from "./api";
import { DepositDetails } from "@/types/transactions";

const depositApi = axios.create({
  baseURL: `${baseURL}/deposits`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postDeposit = async (value: number): Promise<{ depositId: string; qrCodeUrl: string }> => {
  try {
    handleToken(depositApi);
    const res = await depositApi.post("", { value });
    return res.data as { depositId: string; qrCodeUrl: string };
  } catch (error) {
    throw error;
  }
};

export const postConfirmDeposit = async (depositId: string): Promise<{ message: string; newBalance: number }> => {
  try {
    handleToken(depositApi);
    const res = await depositApi.post<{ message: string; newBalance: number }>(`/${depositId}/confirm`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDepositById = async (id: string): Promise<DepositDetails> => {
  try {
    handleToken(depositApi);
    const res = await depositApi.get<DepositDetails>(`/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
