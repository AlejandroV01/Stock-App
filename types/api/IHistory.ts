export interface IHistoryData {
  date: string;
  priceUsd: string;
  time: string;
}

export interface IHistory {
  data?: IHistoryData[];
  error?: string;
}
