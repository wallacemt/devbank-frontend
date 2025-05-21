interface Account {
  accountId: string;
  balance: number;
  createdAt: Date;
}

interface Address {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
}

interface Profile {
  address: Address;
  socialName: string;
  birthDate: Date;
  gender: string;
  maritalStatus: string;
  income: string;
  employmentStatus: string;
  company: string;
  education: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  cpf: string;
  account: Account;
  profile?: Profile;
}
export interface UserProfileRequest {
  cep?: string;
  street?: string;
  complement?: string;
  city?: string;
  socialName?: string;
  birthDate?: string;
  gender?: string;
  maritalStatus?: string;
  income?: string;
  employmentStatus?: string;
  occupation?: string;
  company?: string;
  education?: string;
  transactionPin?: string;
}
