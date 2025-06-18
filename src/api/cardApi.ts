import axios from "axios";
import { baseURL, handleToken, SimpleResponse } from "./api";
import { Card, RequestAddCard } from "@/types/cards";

const cardApi = axios.create({
  baseURL: `${baseURL}/cards`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCards = async (): Promise<Card[]> => {
  handleToken(cardApi);
  try {
    const { data } = await cardApi.get<Card[]>("");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPreApprovedLimit = async (): Promise<{ limit: number }> => {
  handleToken(cardApi);
  try {
    const { data } = await cardApi.get<{ limit: number }>("/pre_approved");
    return data;
  } catch (error) {
    throw error;
  }
};

export const postGenerateCardWithAprrovedLimit = async (expiresFatureDate: string): Promise<Card> => {
  handleToken(cardApi);
  try {
    const { data } = await cardApi.post<Card>("/generate", { expiresFatureDate });
    return data;
  } catch (error) {
    throw error;
  }
};

export const postAddCard = async (values: RequestAddCard): Promise<Card> => {
  handleToken(cardApi);
  try {
    const { data } = await cardApi.post<Card>("", values);
    return data;
  } catch (error) {
    throw error;
  }
};


export const deleteCard = async (id: string): Promise<SimpleResponse> => {
  handleToken(cardApi);
  try {
    const { data } = await cardApi.delete<SimpleResponse>(`/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
