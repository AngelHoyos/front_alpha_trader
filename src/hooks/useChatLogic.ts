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
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("alphaXChatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [tipsModalOpen, setTipsModalOpen] = useState(false);

  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !localStorage.getItem("alphaXHasVisited");
  });

  useEffect(() => {
    localStorage.setItem("alphaXChatHistory", JSON.stringify(chatHistory));

    if (chatHistory.length > 0 && isFirstVisit) {
      setIsFirstVisit(false);
      localStorage.setItem("alphaXHasVisited", "true");
    }
  }, [chatHistory, isFirstVisit]);

  useEffect(() => {
    if (error) {
      setChatHistory((prev) => [...prev, { type: "error", content: error }]);
      setError(null);
    }
  }, [error, setError]);

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
    clearChat,
    handleSubmit,
    tipsModalOpen,
    setTipsModalOpen,
    isFirstVisit,
  };
};
