import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "Digital Assistant",
  initialMessages: [
    createChatBotMessage("Hi! How can I assist you today?"),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#2C3E50",
    },
    chatButton: {
      backgroundColor: "#2C3E50",
    },
  },
};

export default config;
