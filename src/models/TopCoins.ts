export interface Coin {
  id: string;
  image: string;
  name: string;
  currentPrice: number;
  trend24h: "bullish" | "bearish" | "neutral"; // Define the possible trend values
}

export interface TopCoinsProps {
  coinsData: Coin[];
}
