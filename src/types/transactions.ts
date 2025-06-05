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
interface Pagable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: boolean;
  paged: boolean;
  unpaged: boolean;
}

export interface TransactionHistory {
  content: TransactionHistoryItem[];
  pageable: Pagable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
