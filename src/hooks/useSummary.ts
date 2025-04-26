import { useSocket } from "./useSocket";
import { useState, useEffect, useCallback } from "react";
import { Coins } from "../models/Coins.model";

interface PreferenceData {
  preferredSymbols?: string[];
}

export const useSummary = () => {
  const { connect, emitEvent, disconnect, listenEvent, removeListener } =
    useSocket();

  const [secondaryCoinsData, setSecondaryCoinsData] = useState<Coins[]>([]);
  const [mainCoinsData, setMainCoinsData] = useState<Coins[]>([]);
  const [preferencesCoinsData, setPreferencesCoinsData] = useState<Coins[]>([]); // <--- nuevo estado

  const handleMainCoinsData = useCallback((data: { mainCoins: Coins[] }) => {
    setMainCoinsData(data.mainCoins);
  }, []);

  const handleSecondaryCoinsData = useCallback((data: Coins[]) => {
    setSecondaryCoinsData(data);
  }, []);

  const handlePreferencesData = useCallback((data: PreferenceData) => {
    console.log(data);
    
    const symbols = data?.preferredSymbols || [];
    if (symbols.length > 0) {
      emitEvent("preferenceUpdate", { symbols });
    }
  }, [emitEvent]);

  const handlePreferenceUpdate = useCallback((data: Coins[]) => {
    setPreferencesCoinsData(data);
  }, []);

  useEffect(() => {
    return () => {
      removeListener("mainCoinsData", handleMainCoinsData);
      removeListener("secondaryCoinsData", handleSecondaryCoinsData);
      removeListener("preferencesData", handlePreferencesData);
      removeListener("preferenceUpdate", handlePreferenceUpdate); // <--- quitar listener
    };
  }, [
    removeListener,
    handleMainCoinsData,
    handleSecondaryCoinsData,
    handlePreferencesData,
    handlePreferenceUpdate,
  ]);

  const getMainCoinsLiveData = useCallback(() => {
    connect();
    listenEvent("mainCoinsData", handleMainCoinsData);
    emitEvent("getMainCoinsLiveData");
  }, [connect, emitEvent, listenEvent, handleMainCoinsData]);

  const getSecondaryCoinsLiveData = useCallback(() => {
    connect();
    listenEvent("secondaryCoinsData", handleSecondaryCoinsData);
    emitEvent("getSecondaryCoinsLiveData");
  }, [connect, emitEvent, listenEvent, handleSecondaryCoinsData]);

  const getPreferencesAndUpdate = useCallback(() => {
    connect();
    listenEvent("preferencesData", handlePreferencesData);
    listenEvent("preferenceUpdate", handlePreferenceUpdate); // <--- escuchar también preferenceUpdate
    emitEvent("getLiveDataWithPreferences");
  }, [connect, emitEvent, listenEvent, handlePreferencesData, handlePreferenceUpdate]);

  return {
    getMainCoinsLiveData,
    getSecondaryCoinsLiveData,
    getPreferencesAndUpdate,
    disconnect,
    mainCoinsData,
    secondaryCoinsData,
    preferencesCoinsData, // <--- lo retornamos
  };
};
