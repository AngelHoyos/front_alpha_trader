import { Coins } from "../models/Coins.model";
const priceHistory: Record<string, number[]> = {};

export const mergeCoinsData = (
  originalData: Coins[],
  updates: Coins[]
): Coins[] => {
  const validUpdates = updates.filter((coin) => {
    const price = Number(coin.Precio);
    return coin.symboloBinance && !isNaN(price) && price > 0;
  });

  const updatedCoins: Record<string, Coins> = {};

  validUpdates.forEach((coin) => {
    const symbol = coin.symboloBinance!.toUpperCase();

    if (symbol) {
      updatedCoins[symbol] = coin;
    }
  });

  return originalData.map((coin) => {
    const key = coin.binance_symbol?.toLocaleUpperCase();
    const updatedCoin = key ? updatedCoins[key] : undefined;

    if (!updatedCoin) return coin;

    const updatedPrice = Number(updatedCoin.Precio);
    const previousPrice = Number(coin.current_price);

    if (isNaN(updatedPrice) || updatedPrice <= 0) return coin;

    const history = priceHistory[key] || [];
    const newHistory = [...history.slice(-2), updatedPrice];
    priceHistory[key] = newHistory;

    const isStable =
      newHistory.length === 3 &&
      newHistory.every((p) => Math.abs(p - newHistory[0]) < 0.01);

    const percentageChange =
      previousPrice > 0
        ? ((updatedPrice - previousPrice) / previousPrice) * 100
        : 0;

    return {
      ...coin,
      current_price: isStable
        ? Math.round(updatedPrice * 100) / 100
        : coin.current_price,
      price_change_percentage_24h: Math.round(percentageChange * 100) / 100,
    };
  });
};
