import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if ((message.includes('how to test my video?')) || (message.includes('1'))) {
      actions.handle1();
    }

    if ((message.includes('how to check my profile?')) || (message.includes('2'))) {
      actions.handle2();
    }

    if ((message.includes('Can I correct an erroneous exercise?')) || (message.includes('3'))) {
      actions.handle3();
    }

    if ((message.includes('I wish to report a bug.')) || (message.includes('4'))) {
      actions.handle4();
    }

    if ((message.includes('How can I contact you?')) || (message.includes('5'))) {
      actions.handle5();
    }

    if ((message.includes('What is the maximum size limit of video?')) || (message.includes('6'))) {
      actions.handle6();
    }

    if ((message.includes('Which is the expected file format of video?')) || (message.includes('7'))) {
      actions.handle7();
    }

    if ((message.includes('Tell me something about the rules to follow while recording my video.')) || (message.includes('8'))) {
      actions.handle8();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;