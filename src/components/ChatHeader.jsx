/* eslint-disable react/prop-types */
import { GrStatusGoodSmall } from "react-icons/gr";
import { useState, useEffect } from "react";
import DarkMode from "./DarkMode";

const ChatHeader = ({ getUserProfile, selectedChat }) => {
  console.log({ selectedChat });
  const [darkMode, setDarkMode] = useState(false);

  console.log('Chat Header rerender !!!!! 🚧');


  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  const headerStyle = {
    backgroundColor: darkMode ? "#213440" : "#FAFAFA",
    color: darkMode ? "white" : "black",
  };

  return (
    <div
      className="h-20 bg-slate-100 text-black flex items-center justify-between pr-10"
      id="header"
      style={headerStyle}
    >
      <div className=" w-fit sm:w-fit flex justify-between align-middle">
        <div className="chat-image avatar ml-8 mr-4">
          <div className="w-10 rounded-full cursor-pointer">
            <img src={selectedChat.chatPic ? selectedChat.chatPic : selectedChat.profilePic} onClick={getUserProfile} />
          </div>
        </div>
        <div className=" font-semibold w-fit text-lg">{selectedChat.chatName ? selectedChat.chatName : selectedChat.fullName}</div>
      </div>
      <DarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default ChatHeader;
