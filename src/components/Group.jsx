/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";


const Group = ({ handelChat, allGroups }) => {
  const [filteredChats, setfilteredChats] = useState([]);
  const [searchedChat, setSearchedChat] = useState("");
  console.log('Group rerender !!!!! 🚧');

  useEffect(() => {
    if (allGroups && allGroups.length > 0) {
      setfilteredChats(allGroups);
    }
  }, [allGroups]);

  useEffect(() => {
    if (searchedChat) {
      const _filteredChats = allGroups.filter((chat) =>
        chat.chatName.toLowerCase().includes(searchedChat.toLowerCase())
      );
      setfilteredChats(_filteredChats);
    } else {
      setfilteredChats(allGroups);
    }
  }, [searchedChat]);


  return (
    <div className="overflow-x-hidden shadow-sm">
      <div className=" flex flex-col bg items-center h-screen ">

        <div className=" text-gray-500 w-full px-4 mb-2 ">
          <h1 className=" font-sans color font-bold mt-5 text-l ">Groups</h1>
        </div>

        <div className="w-full">
          <div className="shadow-md py-4">
            <input
              type="text"
              name="search"
              id="search"
              placeholder=" Search... "
              className="m-auto rounded-full block w-4/5 py-1 pl-4 pr-4 text-gray-700 border focus:outline-none focus:ring-1 focus:ring-gray-500  sm:text-sm sm:leading-6 bg-[#1e77873b]"
              onChange={(e) => setSearchedChat(e.target.value)}
              value={searchedChat}
            />
          </div>
        </div>

        <div className="w-full overflow-y-scroll">
          {filteredChats &&
            filteredChats.length > 0 &&
            filteredChats.map((chat) => {
              return (
                <div
                  key={chat._id}
                  className="w-5/6 px-5 m-auto flex cursor-pointer justify-between items-center mb-5 mt-2"
                  onClick={() => handelChat(chat)}
                >

                  <div className="flex items-center">
                    <div className="w-10 h-10 min-w-10 min-h-10 overflow-hidden rounded-full ring-2 ring-[#1E7887] ring-offset-gray-100 ">
                      <img src={chat.chatPic} className="rounded-full" />
                    </div>

                    <div className="flex ms-3 flex-col justify-between text-start ">
                      <div className="text-gray color text-gray-600 ">
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
    </div>

  );
};

export default Group;
