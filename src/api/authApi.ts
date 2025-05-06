import { AuthResponse, SimpleResponse } from "@/types/responses";
import { HttpClient } from "./HttpClient";

const authApi = new HttpClient({
  baseUrl: "http://localhost:8081/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (emailOrCpf: string, password: string): Promise<SimpleResponse> => {
  try {
    const userResponse = await authApi.post("/login", { emailOrCpf, password });
    return userResponse.data as SimpleResponse;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const codeValidation = async (code: string, email: string): Promise<AuthResponse> => {
  try {
    const userResponse = await authApi.post("/login/2fa", { emailOrCpf: email, token: code });
    return userResponse.data as AuthResponse;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const registerUser = async (name: string, cpf: string, email: string, password: string) => {
  try {
    const userResponse = await authApi.post("/register", { name, email, cpf, password });
    return userResponse.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const loginCodeResend = async (email: string): Promise<SimpleResponse> => {
  try {
    console.log(email)
    const userResponse = await authApi.post("/login/2fa/resend", { emailOrCpf: email });
    return userResponse.data as SimpleResponse;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
