/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { createGroup } from "../api/messages";

const AllConnections = ({ ALL_USERS, onCreateGroup }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");
  const [chatName, setChatName] = useState("");
  const [participants, setParticipants] = useState([]);

  console.log('All Connection rerender !!!!! 🚧');


  useEffect(() => {
    if (ALL_USERS && ALL_USERS.length > 0) {
      setFilteredUsers(ALL_USERS);
    }
  }, [ALL_USERS]);

  useEffect(() => {
    if (searchedUser) {
      const _filteredUsers = ALL_USERS.filter((user) =>
        user.fullName.toLowerCase().includes(searchedUser.toLowerCase())
      );
      setFilteredUsers(_filteredUsers);
    } else {
      setFilteredUsers(ALL_USERS);
    }
  }, [searchedUser]);

  const checkUserHandler = (userId) => {
    const isUserExist = participants.indexOf(userId);
    console.log({ isUserExist });
    if (isUserExist > -1) {
      const newParticipants = [...participants].filter(
        (partecipant) => partecipant !== userId
      );
      setParticipants(newParticipants);
    } else {
      const newParticipants = [...participants, userId];
      setParticipants(newParticipants);
    }
  };

  const createGroupHandler = async () => {
    try {
      const data = {
        chatName,
        participants,
        isGroup:true,
      };
      const response = await createGroup(data);
      onCreateGroup();
      setParticipants([]);
      setChatName("");
      console.log(response.data);
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <div className="overflow-x-hidden shadow-sm">
      <div className=" flex flex-col bg items-center h-screen ">

        <div className=" text-gray-500 w-full px-4 mb-2 ">
          <h1 className=" font-sans color font-bold mt-5 text-l ">Create Chat</h1>
        </div>

        <div className="w-full">
          <div className="shadow-md py-4">
            <input
              type="text"
              name="search"
              id="search"
              placeholder=" Search... "
              className="m-auto rounded-full block w-4/5 py-1 pl-4 pr-4 text-gray-700 border focus:outline-none focus:ring-1 focus:ring-gray-500  sm:text-sm sm:leading-6 bg-[#1e77873b]"
              onChange={(e) => setSearchedUser(e.target.value)}
              value={searchedUser}
            />
          </div>
        </div>

        <div className="w-full h-[60vh] overflow-y-scroll">
          {filteredUsers &&
            filteredUsers.length > 0 &&
            filteredUsers.map((user) => {
              return (
                <div
                  key={user.id}
                  className="w-5/6 px-5 m-auto flex justify-between items-center mb-5 mt-2"
                >
                  <div className="avatar my-1 flex items-center">
                    <div className="w-10 h-10 min-w-10 min-h-10 rounded-full ring-2 ring-[#1E7887] ring-offset-gray-100 ">
                      <img src={user.profilePic} />
                    </div>
                    <span className="text-gray ml-2 color text-gray-600 ">
                      {user.fullName}
                    </span>
                  </div>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        checked={participants.includes(user.id)}
                        onChange={() => checkUserHandler(user.id)}
                        className="checkbox w-4 h-4 checkbox-success dark"
                      />
                    </label>
                  </div>
                </div>
              );
            })}
        </div>

        {participants && participants.length > 0 && (
          <div className="flex flex-col w-full p-3 gap-4 h-40 ">
            <label
              htmlFor="chatName"
              className="block  text-sm ml-3 font-medium leading-6 color text-gray-900"
            >
              {" "}
              Chat Name - {participants.length} Users
            </label>
            <input
              type="text"
              name="chatName"
              id="chatName"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="border border-[#1E7887] input p-2 w-5/6 m-auto text-gray-900 focus:outline-none  focus:ring-1 focus:ring-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gray-100 focus:bg-gray-200"
            />
            <button
              type="submit"
              disabled={chatName.length === 0}
              className="text-white cursor-pointer bg-cyan-800  mb-2 border-2 m-auto border-cyan-800 border-solid rounded-md btn w-5/6  font-medium hover:bg-white hover:text-cyan-800 disabled:text-gray-600"
              onClick={createGroupHandler}
            >
              Create group
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllConnections;
