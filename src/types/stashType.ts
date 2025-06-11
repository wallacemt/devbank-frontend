export interface Stash {
  id: string;
  name: string;
  value: number;
  description?: string;
  goal: number;
  createdAt: Date;
  lastMovimentation: Date | null;
}

export interface StashRequest {
  id?: string;
  name?: string;
  value?: number;
  description?: string;
  goal?: number;
}
