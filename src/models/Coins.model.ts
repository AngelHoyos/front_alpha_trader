export interface Coin {
  name?: string;
  icon?: any;
  price: string;
  change: string;
  isPositive: boolean;
  date?: string;
  volume?: {
    "1h"?: string;
    "24h"?: string;
    "7d"?: string;
  };
  marketCap?: string;
}
export interface Coins {
  id: string;
  name: string;
  symbol: string;
  binanceSymbol: string;
  image: string;
  marketCap: number;
  marketCapRank: number;
  currentPrice: number;
  high24h: number;
  low24h: number;
  priceChangePercentage24h: number;
  totalVolume: number;
  trend24h: string;
  volumeQuote24h:number;
}

export interface CoinsCardProps {
  coins: Coins[];
}

export interface CoinsTableProps {
  coins: Coin[];
  show: boolean;
}
