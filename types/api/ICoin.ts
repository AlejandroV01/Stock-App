export interface ICoin {
  id: string;
  explorer?: string;
  symbol?: string;
  name?: string;
  supply?: string;
  maxSupply?: null;
  marketCapUsd?: string;
  volumeUsd24Hr?: string;
  priceUsd?: string;
  changePercent24Hr?: string;
  vwap24Hr?: string;
  rank?: string;
}
