import type React from "react";

interface WebSocketStatusProps {
  connectionStatus: string;
}

const WebSocketStatus: React.FC<WebSocketStatusProps> = ({
  connectionStatus,
}) => {
  return (
    <div className="mt-2 flex items-center gap-2">
      <p>WebSocket Status:</p>
      <span
        className={`inline-block w-3 h-3 rounded-full ${
          connectionStatus === "Connected" ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <p>{connectionStatus}</p>
    </div>
  );
};

export default WebSocketStatus;
