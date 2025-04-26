// src/hooks/useSocket.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { socketService } from "../services/SocketService"; // Ajusta la ruta

const SOCKET_URL = "https://alphatrader.up.railway.app/";

export const useSocket = () => {
  // Estado REAL de conexión, usando useState para reactividad
  const [isConnected, setIsConnected] = useState(socketService.isConnected);
  // Ref para evitar múltiples intentos de conexión *iniciados* por este hook
  const connectAttemptedRef = useRef(false);

  // Efecto para suscribirse/desuscribirse a los cambios de estado del servicio
  useEffect(() => {
    const handleStatusChange = (status: boolean) => {
      setIsConnected(status);
      // Si nos desconectamos, reseteamos el flag de intento para poder reconectar manualmente
      if (!status) {
          connectAttemptedRef.current = false;
      }
    };

    // Suscribirse
    socketService.addStatusListener(handleStatusChange);

    // Limpieza al desmontar el componente que usa el hook
    return () => {
      socketService.removeStatusListener(handleStatusChange);
    };
  }, []); // Ejecutar solo una vez al montar

  // Función para iniciar la conexión (ahora más segura)
  const connect = useCallback(() => {
    // Solo intentar si no estamos ya conectados y si este hook no lo ha intentado ya
    if (!isConnected && !connectAttemptedRef.current) {
       const token = sessionStorage.getItem("token");
       if (token) {
          console.log("Hook: Iniciando conexión...");
          socketService.connect(SOCKET_URL, token);
          connectAttemptedRef.current = true; // Marcamos que se intentó
       } else {
          console.error("Hook: No hay token, no se puede conectar.");
       }
    } else {
        console.log(`Hook: connect() llamado pero isConnected=${isConnected}, connectAttempted=${connectAttemptedRef.current}`);
    }
  }, [isConnected]); // Depende de isConnected para evitar llamadas innecesarias

  // Función para desconectar
  const disconnect = useCallback(() => {
    console.log("Hook: Desconectando...");
    socketService.disconnect();
    // Reseteamos el intento por si queremos reconectar luego con este hook
    connectAttemptedRef.current = false;
  }, []);

  // --- Métodos del servicio (usar useCallback para referencias estables) ---
  const emitEvent = useCallback(socketService.emitEvent.bind(socketService), []);
  const listenEvent = useCallback(socketService.listenEvent.bind(socketService), []);
  const removeListener = useCallback(socketService.removeListener.bind(socketService), []);

  // Alias para removeListener (considera si realmente necesitas ambos)
  const offEvent = useCallback((eventName: string, callback?: (...args: any[]) => void) => {
      removeListener(eventName, callback);
  }, [removeListener]);


  return {
    connect,
    disconnect,
    emitEvent,
    listenEvent,
    removeListener,
    offEvent,
    isConnected, // <-- ¡IMPORTANTE! Exponer el estado de conexión real
  };
};