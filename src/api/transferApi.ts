
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
