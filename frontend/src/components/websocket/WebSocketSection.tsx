import type React from "react";
import WebSocketControls from "@/components/websocket/WebSocketControls";
import WebSocketStatus from "@/components/websocket/WebSocketStatus";

interface WebSocketSectionProps {
  connectionStatus: string;
  startWebSocket: () => void;
  stopWebSocket: () => void;
}

const WebSocketSection: React.FC<WebSocketSectionProps> = ({
  connectionStatus,
  startWebSocket,
  stopWebSocket,
}) => {
  return (
    <>
      <WebSocketControls
        connectionStatus={connectionStatus}
        startWebSocket={startWebSocket}
        stopWebSocket={stopWebSocket}
      />
      <WebSocketStatus connectionStatus={connectionStatus} />
    </>
  );
};

export default WebSocketSection;
