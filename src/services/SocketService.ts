import { io, Socket } from "socket.io-client";
type ListenerCallback<T = any> = (data: T) => void;

class SocketService {
  private socket: Socket | null = null;

  connect(url: string, token: string) {
    console.log("🔧 Intentando conectar al socket");
    if (!token) {
      console.error("🚫 No se proporcionó token para la conexión WebSocket.");
      return;
    }
    
    if (!this.socket) {
      this.socket = io(url, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        auth: {
          token: `Bearer ${token}`,
        },
      });

      this.socket.on("connect", () => {
        console.log("🔌 Socket conectado:", this.socket?.id);
      });
      
      this.socket.on("disconnect", (reason) => {
        console.warn("❌ Socket desconectado:", reason);
      });

      this.socket.on("reconnect_attempt", (attempt) => {
        console.log(`🔁 Intento de reconexión #${attempt}`);
      });

      this.socket.on("reconnect_failed", () => {
        console.error("❌ No se pudo reconectar al servidor WebSocket.");
      });

      this.socket.on("connect_error", (error) => {
        console.error("🚫 Error de conexión:", error.message);
      });
    }
  }

  emiEvent<T = any>(event: string, data?: T) {
    this.socket?.emit(event, data);
  }

  listenEvent<T = any>(event: string, callback: ListenerCallback<T>) {
    this.socket?.on(event, callback);
  }

  removeListener(event: string) {
    this.socket?.off(event);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  getSocketInstance(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService();
