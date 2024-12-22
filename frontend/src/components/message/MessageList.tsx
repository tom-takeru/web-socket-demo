import type React from "react";

interface Message {
  message: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div
      id="messages"
      className="flex flex-col gap-4 overflow-y-auto items-start w-full h-96 border-gray-200 rounded border p-2"
    >
      {messages.map((msg) => (
        <div key={msg.timestamp} className="flex flex-col">
          <span className="text-xs text-gray-500">
            {new Date(msg.timestamp).toLocaleString()}
          </span>
          <p className="text-sm">{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
