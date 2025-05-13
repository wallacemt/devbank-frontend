import { UserResponse } from "@/types/userTypes";
import { baseURL, handleToken } from "./api";
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
