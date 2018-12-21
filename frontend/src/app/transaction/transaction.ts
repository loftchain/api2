export interface Transaction {
  amount: number;
  currency: string;
  date: string;
  from: string;
  status: string;
  txId: string;
  id: number;
  customer?: number;
}
