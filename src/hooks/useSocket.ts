import {  useRef } from "react";
import { socketService } from "../services/SocketService";

const SOCKET_URL = 'https://alphatrader.up.railway.app/';

export const useSocket = () => {
  const IsConnected = useRef(false);
  const connect = () => {
    if (!IsConnected.current) {
      socketService.connect(SOCKET_URL);
      IsConnected.current = true;
    }
  };

  const disconnect = () => {
    if (IsConnected.current) {
      socketService.disconnect();
      IsConnected.current = false;
    }
  };
  return {
    connect,
    disconnect,
    emitEvent: socketService.emiEvent.bind(socketService),
    listenEvent: socketService.listenEvent.bind(socketService),
    removeListener: socketService.removeListener.bind(socketService),
  };
};
