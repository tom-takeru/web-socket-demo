import type React from "react";

interface MessageInputFormProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  isDisabled: boolean;
}

const MessageInputForm: React.FC<MessageInputFormProps> = ({
  message,
  setMessage,
  sendMessage,
  isDisabled,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
      className="flex gap-2 justify-around w-full"
    >
      <input
        type="text"
        id="messageInput"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="border p-2 rounded w-full"
        disabled={isDisabled}
      />
      <button
        id="sendButton"
        type="submit"
        className={`rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 ${
          isDisabled ? "cursor-not-allowed" : ""
        }`}
        disabled={isDisabled}
      >
        Send
      </button>
    </form>
  );
};

export default MessageInputForm;
