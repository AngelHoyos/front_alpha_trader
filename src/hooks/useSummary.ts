// src/hooks/useSummary.ts
import { useSocket } from "./useSocket";

export const useSummary = () => {
  const { emitEvent, listenEvent, offEvent } = useSocket();

  const getMainCoinsLiveData = () => {
    
    emitEvent("getMainCoinsLiveData"); 
    listenEvent("mainCoinsLiveData", (data) => { 
       
      console.log("📡 Data principales recibida:", data);
    });
    listenEvent("mainCoinsLiveUpdate", (data) => { 
      
        console.log("📡 Data principales recibida:", data);
      });
  };

  const getSecondaryCoinsLiveData = () => {
    emitEvent("getSecondaryCoinsLiveData");
    listenEvent("secondaryCoinsLiveData", (data) => {
      console.log("📡 Data secundarias recibida:", data);
    });
    listenEvent("secondaryCoinsLiveUpdate", (data) => {
        console.log("📡 Data secundarias recibida:", data);
      });
  };

  return { getMainCoinsLiveData, getSecondaryCoinsLiveData };
};
