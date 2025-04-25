import { useState } from "react";
import { useSocket } from "./useSocket";
import { Coins } from "../models/Coins.model";

export const useAvailableCoinsProfile = () => {
  const [availableCoins, setAvailableCoins] = useState<string[]>([]);
  const { connect, emitEvent, listenEvent } = useSocket();
  const getNameCoins = () => {
    connect();
    emitEvent("getMainCoinsLiveData");
    listenEvent("mainCoinsLiveData", (data: { mainCoins: Coins[] }) => {
      const nameCoins = data.mainCoins.map((coin) => coin.name);
      setAvailableCoins(nameCoins);
    });
  };

  return {
    getNameCoins,
    availableCoins,
  };
};
