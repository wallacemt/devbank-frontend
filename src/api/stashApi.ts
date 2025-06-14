import axios from "axios";
import { baseURL, handleToken, SimpleResponse } from "./api";
import { Stash, StashHistory, StashRequest } from "@/types/stashType";

const stashApi = axios.create({
  baseURL: `${baseURL}/stash`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStashs = async (): Promise<StashHistory> => {
  try {
    handleToken(stashApi);
    const response = await stashApi.get<StashHistory>("");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postStash = async ({ ...data }: StashRequest): Promise<Stash> => {
  try {
    handleToken(stashApi);
    const response = await stashApi.post<Stash>("", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putStashDepositOrLoot = async (id: string, value: number, type: "deposit" | "loot"): Promise<Stash> => {
  try {
    handleToken(stashApi);
    const response = await stashApi.put<Stash>(`/${id}/${type}`, { value });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putStashUpdate = async (id: string, data: StashRequest): Promise<Stash> => {
  try {
    handleToken(stashApi);
    const response = await stashApi.put<Stash>(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStash = async (id: string): Promise<SimpleResponse> => {
  try {
    handleToken(stashApi);
    const response = await stashApi.delete<SimpleResponse>(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
