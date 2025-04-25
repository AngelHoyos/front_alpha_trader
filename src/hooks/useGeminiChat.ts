<<<<<<< HEAD
// src/hooks/useGeminiChat.ts
=======
>>>>>>> e3a59bf2c74dafe7060060699e11db7b4206c1e1
import { useState } from "react";
import axiosInstance from "../api/axiosInstance/axiosInstance";

interface ChatResponse {
<<<<<<< HEAD
  response: string;
=======
  respuesta: string;
>>>>>>> e3a59bf2c74dafe7060060699e11db7b4206c1e1
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
<<<<<<< HEAD
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<ChatResponse>("/gemini", { message });
      setBotReply(response.data.response);
    } catch (err: any) {
      console.error("Error al comunicarse con Gemini:", err);
      setError(err?.response?.data?.message || "Error desconocido");
=======
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
>>>>>>> e3a59bf2c74dafe7060060699e11db7b4206c1e1
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
<<<<<<< HEAD
=======
    setError,
    setMessage,
>>>>>>> e3a59bf2c74dafe7060060699e11db7b4206c1e1
  };
};
