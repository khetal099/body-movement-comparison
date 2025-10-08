import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handle1 = () => {
  const botMessage = createChatBotMessage('On the sidebar Explore > All Exercise there select an exercise of your interest. Now click on "Upload a Video", choose a video this exercise performed by you and upload it. Then click of "Compare" and wait till the comparison takes place. Select "Show Skeleton" button to watch the 17-key points on video. Lastly click on "Show Analysis" button to get the accuracy result');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handle2 = () => {
    const botMessage = createChatBotMessage('You will find your profile and usage history on "Dashboard" page in Sidebar.');
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

  const handle3 = () => {
    const botMessage = createChatBotMessage('Yes😄 you are welcome to. Just browse to Contribute > Perform Standard on the Sidebar. A form appears where you need to enter 1-Name of Exercise, 2-Description of mistakes, 3-Upload your video, 4-Add a thumbnail and baaamm! hit Submit. Our experts will study our mistakes and reupload a more precise one or if your video quality and background is good enough then why not make your video replace the erroneous one😉👍.');
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
  const handle4 = () => {
    const botMessage = createChatBotMessage('Yes😄 you are welcome to. Just browse to Contribute > Report on the Sidebar. A form appears where you need to enter 1-Name of Exercise, 2-Description of issue, 3-Suggestions and hit Report. Our experts will look into the reported bug and fix it ASAP');
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
  
    const handle5 = () => {
    const botMessage = createChatBotMessage('On the Sidebar click on Contact. A form appears where you need to enter 1-Your Name, 2-Your email, 3-Message you wish to deliver us and hit Submit.');
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

    const handle6 = () => {
      const botMessage = createChatBotMessage('100mb is the maximum video size limit and video quality should be atleast 360p.');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
    
      const handle7 = () => {
        const botMessage = createChatBotMessage('Video file format must be .mp4 only.');
      
          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
          }));
        };

        const handle8 = () => {
          const botMessage = createChatBotMessage('Video must be recorded in well lit environment, and do not allow any part of body to move out of video frame while recording.');
        
            setState((prev) => ({
              ...prev,
              messages: [...prev.messages, botMessage],
            }));
          };

  // Put the handleHello and handleDog function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handle1,
            handle2,
            handle3,
            handle4,
            handle5,
            handle6,
            handle7,
            handle8,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;