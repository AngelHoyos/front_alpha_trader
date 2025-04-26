import { useState, useEffect, useCallback } from "react";
import { useSocket } from "./useSocket";
import { Coins } from "../models/Coins.model";

interface PreferenceData { preferredSymbols?: string[]; }
interface KlineData { [key: string]: any; }
interface SymbolUpdatePayload { symbol: string; }
interface SymbolUpdateResponse { symbol: string; data: Coins; }

export const useChart = () => {
  const { connect, emitEvent, listenEvent, removeListener, isConnected } = useSocket();

  const [preferredSymbols, setPreferredSymbols] = useState<string[]>([]);
  const [rawCryptoData, setRawCryptoData] = useState<KlineData | null>(null);
  const [symbolUpdateData, setSymbolUpdateData] = useState<{ [symbol: string]: Coins }>({});
  const [isLoadingSymbolUpdates, setIsLoadingSymbolUpdates] = useState(false);
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handlePreferencesData = useCallback((data: PreferenceData) => {
    const symbols = data?.preferredSymbols || [];
    setPreferredSymbols(symbols);
    setIsLoadingPreferences(false);
  }, []);

  const handleKlineData = useCallback((data: KlineData) => {
    setRawCryptoData(data);
    setIsLoadingDetails(false);
  }, []);

  const handleSymbolUpdateReceived = useCallback((response: SymbolUpdateResponse) => {
    if (response && response.symbol && response.data) {
      setSymbolUpdateData(prevData => ({
        ...prevData,
        [response.symbol]: response.data
      }));
    }
  }, []);

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [connect, isConnected]);

  useEffect(() => {
    if (isConnected) {
      setIsLoadingPreferences(true);

      listenEvent("preferencesData", handlePreferencesData);
      listenEvent("preferenceKlineData", handleKlineData);
      listenEvent("symbolUpdateReceived", handleSymbolUpdateReceived);

      emitEvent("getLiveDataWithPreferences");

      return () => {
        removeListener("preferencesData", handlePreferencesData);
        removeListener("preferenceKlineData", handleKlineData);
        removeListener("symbolUpdateReceived", handleSymbolUpdateReceived);
        setIsLoadingPreferences(false);
        setIsLoadingSymbolUpdates(false);
      };
    }
  }, [isConnected, connect, listenEvent, removeListener, emitEvent, handlePreferencesData, handleKlineData, handleSymbolUpdateReceived]);

  useEffect(() => {
    if (isConnected && preferredSymbols.length > 0) {
      setSymbolUpdateData({});
      setIsLoadingSymbolUpdates(true);

      preferredSymbols.forEach(symbol => {
        const payload: SymbolUpdatePayload = { symbol };
        emitEvent("getSymbolUpdate", payload);
      });
    } else {
      if (Object.keys(symbolUpdateData).length > 0) {
        setSymbolUpdateData({});
      }
      setIsLoadingSymbolUpdates(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferredSymbols, isConnected, emitEvent]);

  const refreshPreferenceData = useCallback(() => {
    if (isConnected) {
      setIsLoadingPreferences(true);
      setPreferredSymbols([]);
      setSymbolUpdateData({});
      setIsLoadingSymbolUpdates(false);
      emitEvent("getLiveDataWithPreferences");
    }
  }, [isConnected, emitEvent]);

  const getDetailsCrypto = useCallback((cryptoId: string, interval: string = "1d") => {
    if (!cryptoId) return;
    if (isConnected) {
      setIsLoadingDetails(true);
      setRawCryptoData(null);
      emitEvent("getCoinDetailPreferences", { cryptoId, interval });
    }
  }, [isConnected, emitEvent]);

  return {
    preferredSymbols,
    rawCryptoData,
    symbolUpdateData,
    isLoading: isLoadingPreferences || isLoadingDetails || isLoadingSymbolUpdates,
    isLoadingPreferences,
    isLoadingDetails,
    isLoadingSymbolUpdates,
    isConnected,
    refreshPreferenceData,
    getDetailsCrypto,
  };
};
