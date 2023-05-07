import { Token } from "../model/Token";

export type TransferData = {
  token: Token;
  balance: number;
  amount?: number;
  from?: string;
  to?: string;
};
