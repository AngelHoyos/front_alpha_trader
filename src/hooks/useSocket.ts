import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:10101";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });

      socketRef.current.on("secondaryCoinsLiveData", (data) => {
        console.log("Data secundarias en vivo:", data);
      });

      socketRef.current.on("mainCoinsLiveData", (data) => {
        console.log("Data principales en vivo:", data);
      });

      socketRef.current.on("connect", () => {
        console.log("Conectado al servidor WebSocket:", socketRef.current?.id);
      });

      socketRef.current.on("disconnect", () => {
        console.warn("Desconectado del servidor WebSocket");
      });

      socketRef.current.on("error", (error) => {
        console.error("Error en socket:", error);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const emitEvent = (eventName: string, data?: any) => {
    socketRef.current?.emit(eventName, data);
  };

  const listenEvent = (eventName: string, callback: (...args: any[]) => void) => {
    socketRef.current?.on(eventName, callback);
  };

  const offEvent = (eventName: string) => {
    socketRef.current?.off(eventName);
  };

  return { socket: socketRef.current, emitEvent, listenEvent, offEvent };
};
