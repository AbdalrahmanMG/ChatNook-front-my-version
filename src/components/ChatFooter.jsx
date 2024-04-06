/* eslint-disable react/prop-types */
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { SlPicture } from "react-icons/sl";
import { IoMdSend } from "react-icons/io";
import EmojiPickerComponent from "./EmojiPickerComponent";

const ChatFooter = ({ createNewMessageHandler,handelMessageChange, message, setMessage, updateMessageId, handleMessageUpdate }) => {
  console.log(updateMessageId);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(false);

  console.log('Chat footer rerender !!!!! 🚧');

  const sendCurrentMessage = () => {
    createNewMessageHandler(currentMessage)
    setCurrentMessage("")
  }


  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event) => {
    setMessage((prevState) => prevState + event.emoji);
    // console.log(emojiObject.target);
  };
  return (
    <div className=" h-16 bg-gray-100 flex items-center bg ">
      <div className=" w-full flex justify-between items-center">
        <div className="m-auto w-2/12 flex justify-around align-middle text-[#1e7887] text-2xl">
          <MdOutlineEmojiEmotions
            className="cursor-pointer  hover:text-orange-500 "
            onClick={toggleEmojiPicker}
          />
          {/*Emoj Icon */}
          {/* <MdAttachFile className="cursor-pointer  hover:text-orange-500" /> */}
          {/*file Icon */}
          {/* <SlPicture className=" cursor-pointer  hover:text-orange-500 " /> */}
          {/*pic Icon */}
        </div>

        <div className=" w-2/4">



          {/* <input
            className="w-full text-gray-900 border-gray-300 rounded-full min-h-1 bg-white text-sm textarea textarea-bordered focus:border-[#1e7887] bg "
            placeholder="Text your Message..."
            rows={1}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              e.key == "Enter" && sendCurrentMessage();
            }}
          ></input> */}
          
          <input      
            className="w-full text-gray-900 border-gray-300 rounded-full min-h-1 bg-white text-sm textarea textarea-bordered focus:border-[#1e7887] bg "
            placeholder="Text your Message..."
            rows={1}
            value={message}
            onChange={(e) => handelMessageChange(e.target.value)}
            onKeyPress={(e) => {
              e.key == "Enter" && createNewMessageHandler();
            }}
          ></input>



        </div>
        <div
          // onClick={createNewMessageHandler}
          onClick={updateMessageId ? handleMessageUpdate : createNewMessageHandler}
          className="ms-10 w-2/12 hover:text-orange-500 cursor-pointer  text-[#1e7887] text-2xl"
        >
          <IoMdSend />
          {/*sender Icon */}
        </div>
      </div>
      {showEmojiPicker && (
        <EmojiPickerComponent onEmojiClick={handleEmojiClick} />
      )}
    </div>
  );
};
export default ChatFooter;
