import { useState } from "react";
import axiosInstance from "../api/axiosInstance/axiosInstance";

interface ChatResponse {
  respuesta: string;
}

export const useGeminiChat = () => {
  const [message, setMessage] = useState("");
  const [botReply, setBotReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<ChatResponse>("/gemini/chat", {
        mensaje: message,
      });

      setBotReply(response.data.respuesta);
    } catch (err: any) {
      console.error("Error al comunicarse con Gemini:", err);
      setError(
        err?.response?.data?.mensaje || "Error al procesar la solicitud"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    message,
    botReply,
    loading,
    error,
    handleChange,
    handleSubmit,
    setError,
    setMessage,
  };
};
