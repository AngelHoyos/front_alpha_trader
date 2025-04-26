// src/services/SocketService.ts
import { io, Socket } from "socket.io-client";

type ListenerCallback<T = any> = (data: T) => void;
type StatusListener = (isConnected: boolean) => void; 
class SocketService {
  private socket: Socket | null = null;
  public isConnected: boolean = false; // <-- Nuevo: Estado público
  private statusListeners: StatusListener[] = []; // <-- Nuevo: Array de listeners de estado

  connect(url: string, token: string) {
    console.log("🔧 Intentando conectar al socket");
    if (!token) {
      console.error("🚫 No se proporcionó token.");
      return;
    }
    // Evitar múltiples conexiones si ya está conectado o conectando
    if (this.socket) {
       console.log("🔌 Socket ya existe (conectado o conectando).");
       // Si ya está conectado, notifica a los listeners inmediatamente
       if(this.isConnected) this.notifyStatusListeners(true);
       return;
    }

    this.socket = io(url, {
      transports: ["websocket"], // Considera quitar esto si no es estrictamente necesario
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      auth: {
        token: `Bearer ${token}`,
      },
    });

    this.socket.on("connect", () => {
      console.log("🔌 Socket conectado:", this.socket?.id);
      this.isConnected = true;
      this.notifyStatusListeners(true); // <-- Notificar éxito
    });

    this.socket.on("disconnect", (reason) => {
      console.warn("❌ Socket desconectado:", reason);
      this.isConnected = false;
      this.socket = null; // Permite reconectar llamando a connect() de nuevo
      this.notifyStatusListeners(false); // <-- Notificar desconexión
    });

    this.socket.on("connect_error", (error) => {
      console.error("🚫 Error de conexión:", error.message);
       this.isConnected = false;
       this.socket = null; // Podría ser necesario para permitir reintento manual
       this.notifyStatusListeners(false); // <-- Notificar error/desconexión
    });

    // ... otros listeners como reconnect_attempt, reconnect_failed ...
     this.socket.on("reconnect_attempt", (attempt) => {
        console.log(`🔁 Intento de reconexión #${attempt}`);
      });

      this.socket.on("reconnect_failed", () => {
        console.error("❌ No se pudo reconectar al servidor WebSocket.");
         this.isConnected = false;
         this.socket = null; // Permite reconectar
         this.notifyStatusListeners(false);
      });
  }

  // --- Nuevos métodos para manejar listeners de estado ---
  addStatusListener(listener: StatusListener) {
    this.statusListeners.push(listener);
    // Informar inmediatamente al nuevo listener del estado actual
    listener(this.isConnected);
  }

  removeStatusListener(listener: StatusListener) {
    this.statusListeners = this.statusListeners.filter(l => l !== listener);
  }

  private notifyStatusListeners(status: boolean) {
    this.statusListeners.forEach(listener => listener(status));
  }
  // --- Fin de nuevos métodos ---

  // Renombrar typo y añadir log
  emitEvent<T = any>(event: string, data?: T) {
    console.log(`🚀 Emitiendo evento '${event}':`, data);
    this.socket?.emit(event, data);
  }

  // Añadir logs y chequeo
  listenEvent<T = any>(event: string, callback: ListenerCallback<T>) {
     if (!this.socket || !this.isConnected) {
       console.warn(`⚠️ Socket no conectado (${this.isConnected}). No se puede escuchar el evento '${event}' aún.`);
       return; // No registrar si no está conectado
     }
    console.log(`👂 Registrando listener para el evento: ${event}`);
    this.socket.on(event, (data: T) => {
      console.log(`✅ Evento '${event}' recibido con datos:`, data);
      try {
        callback(data);
      } catch (error) {
        console.error(`❌ Error dentro del callback para el evento '${event}':`, error);
      }
    });
  }

  // Modificar para poder remover un listener específico si se pasa el callback
  removeListener<T = any>(event: string, callback?: ListenerCallback<T>) {
     if (!this.socket) return;
    console.log(`🔌 Removiendo listener para ${event}${callback ? ' específico' : 's todos'}`);
    if (callback) {
      this.socket.off(event, callback);
    } else {
      this.socket.off(event); // Comportamiento original si no se pasa callback
    }
  }

  disconnect() {
     if (this.socket) {
        console.log("🔌 Desconectando socket...");
        this.socket.disconnect();
        // El estado y la notificación se manejan en el listener 'disconnect'
     } else {
        // Si se llama a disconnect cuando ya no hay socket, asegurarse que el estado sea consistente
        if (this.isConnected) {
            this.isConnected = false;
            this.notifyStatusListeners(false);
        }
     }
  }

  getSocketInstance(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService();