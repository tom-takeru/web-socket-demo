import { useState } from "react";

export function useMessages() {
  const [messages, setMessages] = useState<
    { message: string; timestamp: string }[]
  >([]);

  const addMessage = (message: string, timestamp: string) => {
    setMessages((prevMessages) => {
      if (!prevMessages.some((msg) => msg.timestamp === timestamp)) {
        return [{ message, timestamp }, ...prevMessages];
      }
      return prevMessages;
    });
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    addMessage,
    clearMessages,
  };
}
