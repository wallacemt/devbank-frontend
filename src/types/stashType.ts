import { PageResponse } from "./pageble";

export interface Stash {
  id: string;
  name: string;
  value: number;
  description?: string;
  goal: number;
  createdAt: Date;
  lastMovimentation: Date | null;
}

export type StashHistory = PageResponse<Stash>;

export interface StashRequest {
  id?: string;
  name?: string;
  value?: number;
  description?: string;
  goal?: number;
}
