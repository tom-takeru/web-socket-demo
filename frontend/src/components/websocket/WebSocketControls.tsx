import type React from "react";

interface WebSocketControlsProps {
  connectionStatus: string;
  startWebSocket: () => void;
  stopWebSocket: () => void;
}

const WebSocketControls: React.FC<WebSocketControlsProps> = ({
  connectionStatus,
  startWebSocket,
  stopWebSocket,
}) => {
  return (
    <div className="flex gap-2 mt-4">
      <button
        type="button"
        onClick={startWebSocket}
        className={`rounded bg-green-500 text-white px-4 py-2 hover:bg-green-700 ${
          connectionStatus === "Connected" ? "cursor-not-allowed" : ""
        }`}
        disabled={connectionStatus === "Connected"}
      >
        Start
      </button>
      <button
        type="button"
        onClick={stopWebSocket}
        className={`rounded bg-red-500 text-white px-4 py-2 hover:bg-red-700 ${
          connectionStatus === "Disconnected" ? "cursor-not-allowed" : ""
        }`}
        disabled={connectionStatus === "Disconnected"}
      >
        Stop
      </button>
    </div>
  );
};

export default WebSocketControls;
