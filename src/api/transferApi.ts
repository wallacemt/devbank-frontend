import { baseURL, handleToken } from "./api";
import axios from "axios";
import { UserKeyResponse } from "@/types/responses";

const transferApi = axios.create({
  baseURL: `${baseURL}/transfer`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserByKey = async (userKey: string): Promise<UserKeyResponse> => {
  try {
    handleToken(transferApi);
    const userResponse = await transferApi.post<UserKeyResponse>("/user/key", { userKey });
    return userResponse.data;
  } catch (err: any) {
    throw err;
  }
};

export const postPixTransfer = async (
  amount: string,
  reciveKey: string,
  transactionPin: string
): Promise<{ message: string, transactionId: string }> => {
  try {
    handleToken(transferApi);
    const userResponse = await transferApi.post("/pix", {
      amount,
      reciveKey,
      transactionPin,
    });
    return userResponse.data;
  } catch (err: any) {
    throw err;
  }
};


