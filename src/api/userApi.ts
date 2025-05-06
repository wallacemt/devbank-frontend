import { UserResponse } from "@/types/userTypes";
import { HttpClient } from "./HttpClient";
import { setAuthHeader } from "./refreshAuth";

const userApi = new HttpClient({
  baseUrl: "http://localhost:8081/user",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUser = async (): Promise<UserResponse> => {
  try {
    setAuthHeader(userApi);
    const userResponse = await userApi.get<UserResponse>("");
    return userResponse.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
