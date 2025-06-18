export interface Card {
  id: string;
  number: string;
  cardHolderName: string;
  expiryDate: string;
  limitApproved: number;
  cardTitle: string;
}
export interface RequestAddCard {
  number: string;
  cardHolderName: string;
  expiryDate: string;
  limitApproved?: number;
  cardTitle: string;
  cvv: string;
}
