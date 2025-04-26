export interface Coin {
  id: string;
  image: string;
  name: string;
  currentPrice: number;
  trend24h: string; // Define the possible trend values
}

export interface TopCoinsProps {
  coinsData: Coin[];
}
