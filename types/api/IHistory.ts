export interface IHistory {
  data: {
    date: string;
    priceUsd: string;
    time: string;
  }[];
  error?: string;
}
