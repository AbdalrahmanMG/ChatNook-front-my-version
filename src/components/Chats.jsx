import { useEffect, useState } from "react";

const Chats = ({handleChatMessages, ALL_USERS }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");
  console.log('Chats rerender !!!!! 🚧');


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


  return (
    <div className="overflow-hidden shadow-sm">
      <div className=" flex flex-col bg items-center h-screen ">
        {/* Header */}
        <div className=" text-gray-500 w-full px-4 mb-2 ">
          <h1 className=" font-sans color font-bold mt-5 text-l ">Contacts</h1>
        </div>
        {/* Search */}
        <div className="w-full">
          <div className="shadow-md  py-4">
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

        {/* Show contacts */}
        <div className="w-full overflow-y-scroll">
          {filteredUsers &&
            filteredUsers.length > 0 &&
            filteredUsers.map((user) => {
              return (
                <div
                  key={user.id}
                  className="w-5/6 px-5 m-auto flex cursor-pointer justify-between items-center mb-5 mt-2"
                  onClick={() => handleChatMessages(user)}
               >

                  <div className="avatar my-1 flex items-center">
                    <div className="w-10 h-10 min-w-10 min-h-10 rounded-full ring-2 ring-[#1E7887] ring-offset-gray-100 ">
                      <img src={user.profilePic} />
                    </div>
                    
                    <span className="text-gray ml-2 color text-gray-600 ">
                      {user.fullName}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  )
}

export default Chats
