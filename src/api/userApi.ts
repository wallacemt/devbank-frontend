import { UserProfileRequest, UserResponse } from "@/types/userTypes";
import { baseURL, handleToken, SimpleResponse } from "./api";
import axios from "axios";

const userApi = axios.create({
  baseURL: `${baseURL}/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUser = async (): Promise<UserResponse> => {
  try {
    handleToken(userApi);
    const userResponse = await userApi.get<UserResponse>("");
    return userResponse.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const postProfie = async (data: UserProfileRequest): Promise<SimpleResponse> => {
  try {
    handleToken(userApi);
    const userResponse = await userApi.post("/profile", data);
    return userResponse.data;
  } catch (error) {
    throw error;
  }
};

export const postReclaimBonus = async (): Promise<SimpleResponse> => {
  try {
    handleToken(userApi);
    const userResponse = await userApi.post("/reclaim-bonus");
    return userResponse.data;
  } catch (error) {
    throw error;
  }
};
