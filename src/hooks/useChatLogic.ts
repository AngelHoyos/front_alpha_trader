import { useState, useEffect } from "react";
import { ChatMessage, UseChatLogicProps } from "../models/AlphaX.model";

export const useChatLogic = ({
  botReply,
  message,
  error,
  onSubmit,
  resetMessage,
  setError,
}: UseChatLogicProps) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [tipsModalOpen, setTipsModalOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const presetMessages = [
    "¿Cómo puedo ayudarte hoy?",
    "Explícame más sobre tu proyecto",
  ];
  useEffect(() => {
    if (error) {
      setChatHistory((prev) => [...prev, { type: "error", content: error }]);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    const visitedBefore = localStorage.getItem("hasVisitedAlphaX");
    if (visitedBefore) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem("hasVisitedAlphaX", "true");
    }
  }, []);

  const handleSubmit = () => {
    if (message.trim()) {
      setChatHistory((prev) => [
        ...prev,
        { type: "question", content: message },
      ]);
      onSubmit();
      resetMessage();
    }
  };

  useEffect(() => {
    if (botReply) {
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: botReply },
      ]);
    }
  }, [botReply]);

  const clearChat = () => {
    setChatHistory([]);
  };

  return {
    chatHistory,
    presetMessages,
    clearChat,
    handleSubmit,
    tipsModalOpen,
    setTipsModalOpen,
    isFirstVisit,
    setIsFirstVisit,
  };
};
