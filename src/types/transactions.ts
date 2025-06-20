import { PageResponse } from "./pageble";

export interface TransactionHistoryItem {
  id: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  outherAccountUsername: string;
  timestamp: Date;
  receiverId: string;
  senderId: string;
  transactionType: "PIX" | "TRANSFER" | "DEPOSIT" | "PAYMENT";
  direction: "SENT" | "RECEIVED";
}

export type TransactionHistory = PageResponse<TransactionHistoryItem>;

export interface DepositDetails {
  id: string;
  depositStatus: "PENDING" | "COMPLETED";
  value: 2.22;
  createdAt: string;
}
