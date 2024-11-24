class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("passport")) {
        this.actionProvider.handlePassport();
      } else if (lowerCaseMessage.includes("details")) {
        this.actionProvider.handleDetails();
      } else {
        this.actionProvider.handleUnknown();
      }
    }
  }
  
  export default MessageParser;
  