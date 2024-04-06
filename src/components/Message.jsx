/* eslint-disable react/prop-types */

const Message = ({ handelChat, allGroups }) => {
      
  console.log('Messages old chats rerender !!!!! 🚧');

    return (
      <div className="container flex flex-col justify-start items-center bg h-screen overflow-hidden ">
        <div className="w-full flex justify-between items-center pe-7 p-3 ">
          <div className=" text-gray-500">
            <h1 className=" font-sans my-3 font-bold text-xl color ms-3 ">
              Chats
            </h1>
          </div>
        </div>
      
  
        <div className="overflow-y-scroll h-fit p-1 sm:h-screen">
          {allGroups.map((chat) => {
            return (
              <div
                key={chat._id}
                className="p-2 my-1 flex items-center cursor-pointer"
                onClick={() => handelChat(chat)}
              >
                <div className=" messageage-container flex justify-between items-center h-10 mb-3 ">
                  <div className="img-sec w-16 me-1 p-1">
                    <img
                      src={chat.chatPic}
                      className={`ring ring-success rounded-full min-h-10 w-10 h-10 min-w-10 hover:${""}`}
                      alt=""
                    />
                  </div>
                  <div className="username-sec flex flex-col align-top justify-between text-start  ">
                    <div className="text-sm font-bold color text-gray-600">
                      {chat.chatName}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {chat?.lastMessage?.message || "write your first message!"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

export default Message;
