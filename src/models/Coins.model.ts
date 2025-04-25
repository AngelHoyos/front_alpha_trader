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
  binance_symbol: string;
  image: string;
  market_cap: number;
  market_cap_rank: number;
  current_price:  number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  total_volume: number;

  CapMerc?: string;
  Id?: string;
  Precio?: string;
  Volumen?: string;
  date?: string;
  symbolo?: string;
  symboloBinance?: string;
}

export interface CoinsCardProps {
  coins: Coins[];
}

export interface CoinsTableProps {
  coins: Coin[];
  show: boolean;
}
