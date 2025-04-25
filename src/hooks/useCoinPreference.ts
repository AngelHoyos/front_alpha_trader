import { useEffect, useState } from "react";

export const useCoinPreference = (
  selectedCoins: string[],
) => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [coinToAdd, setCoinToAdd] = useState<string>("");

  useEffect(() => {
    setPreferences(selectedCoins);
  }, [selectedCoins]);

  const handleToggle = (coin: string) => {
    const updated = preferences.includes(coin)
      ? preferences.filter((c) => c !== coin)
      : [...preferences, coin];

    setPreferences(updated);
  };

  const handleAddCoin = () => {
    if (coinToAdd && !preferences.includes(coinToAdd)) {
      const updated = [...preferences, coinToAdd];
      setPreferences(updated);
      setCoinToAdd("");
    }
  };
  return {
    preferences,
    coinToAdd,
    setCoinToAdd,
    handleToggle,
    handleAddCoin,
  };
};
