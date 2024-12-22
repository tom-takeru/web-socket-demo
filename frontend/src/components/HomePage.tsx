"use client";

import { useState, useRef, useEffect } from "react";
import { useMessages } from "@/hooks/useMessages";
import MessageSection from "@/components/message/MessageSection";
import WebSocketSection from "@/components/websocket/WebSocketSection";

export default function HomePage() {
  const { messages, clearMessages, addMessage } = useMessages();
  const [connectionStatus, setConnectionStatus] = useState<
    "Connected" | "Disconnected"
  >("Disconnected");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleOpen = () => {
    console.log("Connected to WebSocket");
    setConnectionStatus("Connected");
  };

  const handleMessage = (event: MessageEvent) => {
    console.log("Message from server:", event.data);
    const data = JSON.parse(event.data);
    addMessage(data.message, data.timestamp);
    setMessage("");
    setIsSending(false);
  };

  const handleError = (error: Event) => {
    console.log("WebSocket error:", error);
    alert("Failed to connect to WebSocket.");
  };

  const handleClose = () => {
    console.log("WebSocket closed");
    setConnectionStatus("Disconnected");
    wsRef.current = null;
  };

  const startWebSocket = () => {
    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
      alert("WebSocket is already open");
      return;
    }

    clearMessages();

    const ws = new WebSocket("ws://localhost:8080/ws");
    wsRef.current = ws;

    ws.onopen = handleOpen;
    ws.onmessage = handleMessage;
    ws.onerror = handleError;
    ws.onclose = handleClose;
  };

  const stopWebSocket = () => {
    if (!wsRef.current) {
      alert("WebSocket is not open");
      return;
    }
    wsRef.current.close();
    wsRef.current = null;
    setConnectionStatus("Disconnected");
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Message cannot be empty");
      return;
    }

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      alert("WebSocket is not open");
      return;
    }

    setIsSending(true);
    const jsonMessage = JSON.stringify({ message });
    wsRef.current.send(jsonMessage);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <h1 className="text-3xl font-bold">WebSocket Demo App</h1>
      <main className="flex flex-col gap-2 items-center w-full max-w-md">
        <MessageSection
          messages={messages}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          isDisabled={connectionStatus === "Disconnected" || isSending}
        />
        <WebSocketSection
          connectionStatus={connectionStatus}
          startWebSocket={startWebSocket}
          stopWebSocket={stopWebSocket}
        />
      </main>
    </div>
  );
}
