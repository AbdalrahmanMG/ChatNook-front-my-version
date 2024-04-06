/* eslint-disable react/prop-types */
import StartMessage from "./StartMessage";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef } from "react";
import moment from 'moment';

console.log('Chat Message rerender !!!!! 🚧');


const ChatMessage = (props) => {
  console.log(props);
  let {
    allMessages,
    userId,
    handleMessageDelete,
    handleSetUpdateMessage
  } = props

  const handleTimeDifference = (messageTime) => {

    let currentTime = new Date();
    let messageDate = new Date(messageTime);
    let timeDifferance = currentTime - messageDate
    let timeInMinutes = timeDifferance / (1000 * 60);
    if (timeInMinutes > 15) {
      return false
    } else {
      return true
    }
  }


  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  console.log("all message form chat message 🏔🧭", allMessages);

  return (
    <div className="mb-4 px-3 overflow-y-scroll" style={{ height: 'calc(100%)' }}>


      {allMessages.map((message) => {
        return (
          <div key={message._id} ref={scrollRef}>
            <div
              key={message._id}
              className={`chat flex ${message?.senderId._id === userId
                ?
                "justify-start flex-row-reverse " : "justify-start"
                // "chat-end"
                // : "chat-start"
                }`}
            >
              {/* chat avatar */}
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  {message.senderId ?
                    <img src={message.senderId.profilePic} alt="" />
                    : <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><mask id=":r34:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:r34:)"><rect width="36" height="36" fill="#07abf5"></rect><rect x="0" y="0" width="36" height="36" transform="translate(3 5) rotate(341 18 18) scale(1.2)" fill="#215f88" rx="36"></rect><g transform="translate(-5 1) rotate(-1 18 18)"><path d="M13,21 a1,0.75 0 0,0 10,0" fill="#FFFFFF"></path><rect x="13" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect><rect x="21" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect></g></g></svg>
                  }
                </div>
              </div>

              {/* chat messages */}
              <div className="">
                <div
                  className={`chat-bubble overflow-hidden max-w-xl flex h-fit ps-4 py-4 flex-col ${message.senderId._id === userId
                    ? " bg-neutral-100 text-black bg"
                    : "bg-[#1e7887] text-white"
                    } `}
                >

                  <div
                    className={`text-xs top-0 pb-2 ${message.senderId._id === userId
                      ? "text-orange-600"
                      : " text-yellow-300"
                      } `}
                  >
                    {message.senderId.fullName}
                  </div>
                  <div
                    className="text-sm :"
                  >
                    {message.message}
                  </div>
                </div>
                <div className={`${message.senderId._id === userId ? "text-right" : "text-left"}`}>
                  {moment(message.createdAt).fromNow()}
                </div>
              </div>

              {/* edit and delete section -- ACCEPT -- ABDALRAHMAN */}
              {message.senderId._id === userId && handleTimeDifference(message.createdAt) ?
                <div className="dropdown text-xs dropdown-left">
                  <div tabIndex={0} role="button" className="btn m-1 rounded-full"><BsThreeDotsVertical />
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                    {/* <li onClick={() => handleSetUpdateMessage(message.message, message._id)}><a >edit</a></li> */}
                    <li onClick={() => handleMessageDelete({ messageId: message._id, userId: message.senderId._id })}><a>delete</a></li>
                  </ul>
                </div>
                :
                <></>
              }
            </div>

          </div>
        );
      })}


    </div>
  );
};

export default ChatMessage;
