import { AuthResponse, SimpleResponse } from "@/types/responses";
import axios from "axios";
import { baseURL } from "./api";

const authApi = axios.create({
  baseURL: `${baseURL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (emailOrCpf: string, password: string): Promise<SimpleResponse> => {
  try {
    const userResponse = await authApi.post("/login", { emailOrCpf, password });
    return userResponse.data as SimpleResponse;
  } catch (err: any) {
    console.error(err);
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

export const registerUser = async (
  name: string,
  cpf: string,
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<SimpleResponse> => {
  console.log(name, email, cpf, password, passwordConfirmation);
  try {
    const userResponse = await authApi.post<SimpleResponse>("/register", {
      name,
      email: email,
      cpf,
      password,
      passwordConfirmation,
    });
    return userResponse.data;
  } catch (err: any) {
    console.log(err);
    console.error(err.message);
    throw err;
  }
};

export const registerEmailSendOrResend = async (
  name: string,
  email: string,
  isResend = false
): Promise<SimpleResponse> => {
  try {
    if (!isResend) {
      return (await authApi.post<SimpleResponse>("/register/email", { email, name })).data;
    } else {
      return (await authApi.post<SimpleResponse>("/register/email/resend", { email, name })).data;
    }
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const registerCodeVerify = async (email: string, code: string): Promise<SimpleResponse> => {
  try {
    const userResponse = await authApi.post("/register/email/verify", { email, code });
    return userResponse.data as SimpleResponse;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const loginCodeResend = async (email: string): Promise<SimpleResponse> => {
  try {
    console.log(email);
    const userResponse = await authApi.post("/login/2fa/resend", { emailOrCpf: email });
    return userResponse.data as SimpleResponse;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const emailOrCpfValidation = async (emailOrCpf: string): Promise<SimpleResponse> => {
  try {
    const userResponse = await authApi.post("/validation", { emailOrCpf });
    return userResponse.data as SimpleResponse;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
