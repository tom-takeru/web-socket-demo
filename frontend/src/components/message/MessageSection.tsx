import type React from "react";
import MessageList from "@/components/message/MessageList";
import MessageInputForm from "@/components/message/MessageInputForm";

interface MessageSectionProps {
  messages: { message: string; timestamp: string }[];
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  isDisabled: boolean;
}

const MessageSection: React.FC<MessageSectionProps> = ({
  messages,
  message,
  setMessage,
  sendMessage,
  isDisabled,
}) => {
  return (
    <>
      <MessageList messages={messages} />
      <MessageInputForm
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default MessageSection;
