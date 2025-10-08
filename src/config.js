import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'ChatBot';

const config = {
  // initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  initialMessages: [createChatBotMessage(`Hi! please enter your query`),createChatBotMessage(`Either type the below question or just type and ENTER the question no. corresponding to it.`),createChatBotMessage(`1-how to test my video?`),createChatBotMessage(`2-how to check my profile?`),createChatBotMessage(`3-Can I correct an erroneous exercise?`),createChatBotMessage(`4-I wish to report a bug.`),createChatBotMessage(`5-How can I contact you?`),createChatBotMessage(`6-What is the maximum size limit of video?`),createChatBotMessage(`7-Which is the expected file format of video?`),createChatBotMessage(`8-Tell me something about the rules to follow while recording my video.`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;