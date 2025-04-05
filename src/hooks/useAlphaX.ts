import  { useState } from "react";
import { ChatResponse, Message } from "../models/AlphaX.model";
import axiosInstance from "../api/axiosInstance/axiosInstance";

const useAlphaX = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hola, Soy Alpha X tu Inteligencia Artificial apoyo",
    },
  ]);

  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage: Message[] = [
      ...messages,
      { sender: "user", text: trimmed },
    ];
    setMessages(newMessage);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<ChatResponse>("/chat", {
        messages: trimmed,
      });

      const reply = response.data?.reply || "No se recibió la respuesta";

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (error: any) {
      console.error("Error en la petición:", error);

      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Ocurrió un error al obtener la respuesta del servidor.";

      setError(msg);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Hubo un error al obtener la respuesta del servidor.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index: number, currentText: string) => {
    setEditIndex(index);
    setEditText(currentText);
  };

  const handleSaveEdit = () => {
    if (editIndex === null) return;

    const updatedMessages = [...messages];
    updatedMessages[editIndex] = {
      ...updatedMessages[editIndex],
      text: editText,
    };

    setMessages(updatedMessages);
    setEditIndex(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditText("");
  };

  return {
    messages,
    input,
    editIndex,
    editText,
    loading,
    error,
    setInput,
    handleSend,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    setEditText,
    setError,
  };
};

export default useAlphaX;
