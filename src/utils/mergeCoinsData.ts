import { Coins } from "../models/Coins.model";

export const mergeCoinsData = (
  originalData: Coins[],
  updates: Coins[]
): Coins[] => {
  const updatedCoins: { [name: string]: Coins } = {};

  updates.forEach((coin) => {
    const name = coin.symboloBinance?.toUpperCase();
    if (name) {
      updatedCoins[name] = coin;
    }
  });

  return originalData.map((coin) => {
    const key = coin.binance_symbol?.toLocaleUpperCase();
    const updatedCoin = key ? updatedCoins[key] : undefined;

    if (!updatedCoin) return coin;

    const updatedPrice = Number(updatedCoin.Precio);
    const previousPrice = Number(coin.current_price);

    if (isNaN(updatedPrice) || updatedPrice <= 0) return coin;

    const percentageChange =
      previousPrice > 0
        ? ((updatedPrice - previousPrice) / previousPrice) * 100
        : 0;

    const roundedPrice = Math.round(updatedPrice * 100) / 100;
    const roundedChange = Math.round(percentageChange * 100) / 100;

    return {
      ...coin,
      current_price: roundedPrice,
      price_change_percentage_24h: roundedChange,
    };
  });
};
