class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handlePassport() {
      const message = this.createChatBotMessage(
        "You can view your digital passport in the dashboard."
      );
      this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    }
  
    handleDetails() {
      const message = this.createChatBotMessage(
        "You can update your details in the 'Update Details' section."
      );
      this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    }
  
    handleUnknown() {
      const message = this.createChatBotMessage(
        "I'm sorry, I didn't understand that. Please try again."
      );
      this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    }
  }
  
  export default ActionProvider;
  