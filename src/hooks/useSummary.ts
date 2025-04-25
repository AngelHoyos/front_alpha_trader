import { useSocket } from "./useSocket";
import {  useState } from "react";
import { Coins } from "../models/Coins.model";
export const useSummary = () => {
  const { connect, emitEvent, disconnect,listenEvent } = useSocket();

  const [secondaryCoinsData, setSecondaryCoinsData] = useState<Coins[]>([]);
  const [secondaryCoinsDataUpdate, setSecondaryCoinsDataUpdate] = useState<
    Coins[]
  >([]);
  const [mainCoinsData, setMainCoinsData] = useState<Coins[]>([]);
  const [mainCoinsDataUpdate, setMainCoinsDataUpdate] = useState<Coins[]>([]);

  const getMainCoinsLiveData = () => {
    connect();

    emitEvent("getMainCoinsLiveData");

    listenEvent("mainCoinsLiveData", (data: { mainCoins: Coins[] }) => {
      console.log(data.mainCoins);
      
      setMainCoinsData(data.mainCoins);
    });

    listenEvent("mainCoinsLiveUpdate", (update: Coins[]) => {
      console.log(update);
      
      setMainCoinsDataUpdate(update);
    });
  };

  const getSecondaryCoinsLiveData = () => {
    connect();
    emitEvent("getSecondaryCoinsLiveData");

    listenEvent("secondaryCoinsLiveData", (data) => {
      console.log("📡 Data secundarias recibida:", data);
      setSecondaryCoinsData(data);
    });

    listenEvent("secondaryCoinsLiveUpdate", (data) => {
      console.log("📡 Actualización secundarias:", data);
      setSecondaryCoinsDataUpdate(data);
    });
  };

  return {
    getMainCoinsLiveData,
    getSecondaryCoinsLiveData,
    disconnect,
    mainCoinsData,
    mainCoinsDataUpdate,
    secondaryCoinsData, 
    secondaryCoinsDataUpdate,
  };
};
