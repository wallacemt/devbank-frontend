import axios from "axios";
import { baseURL, handleToken } from "./api";

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
