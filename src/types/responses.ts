export interface SimpleResponse {
  message: string;
  email?: string;
}

export interface AuthResponse {
  token: string;
  message: string;
}

export interface UserKeyResponse {
  userId: string;
  userName: string;
  userCpf: string;
  accountId: string;
  referenceKey:string;
}
