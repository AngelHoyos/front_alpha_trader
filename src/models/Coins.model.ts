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

export interface CoinsCardProps {
  coins: Coin[];
}

export interface CoinsTableProps {
  coins: Coin[];
  show: boolean;
}
