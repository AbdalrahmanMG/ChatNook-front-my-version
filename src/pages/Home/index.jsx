import UserProfile from "../../components/UserProfile";
import ChatFooter from "../../components/ChatFooter";
import ChatMessage from "../../components/ChatMessage";
import ChatHeader from "../../components/ChatHeader";
import { useContext, useEffect, useState } from "react";
import Message from "../../components/Message";
import { MESSAGE, ALL_USERS } from "./mock";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import AllConnections from "./../../components/AllConnections";
import Group from "../../components/Group";
import Chats from "../../components/Chats";
import {
  getAllUsers,
  getAllGroups,
  getAllMessages,
  deleteMessage,
  updatingMessage
} from "../../api/messages";
import Logo from "./../../components/Logo";
import StartMessage from "../../components/StartMessage";
import io from 'socket.io-client';
import { userContext } from "../../context/UserContext";


// start Home component 
export default function Home() {
  let { userId } = useContext(userContext);
  const date = new Date();
  const datetext = date.getHours() + ":" + date.getMinutes();
  console.log(datetext);
  const [hover, setHover] = useState(false);
  const [message, setMessage] = useState("");
  let [userProfile, setUserProfile] = useState(false);
  const [connectionToggel, setconnectionToggel] = useState(false);
  const [userProfileToggel, setUserProfileToggel] = useState(false);
  const [chatProfileToggel, setChatProfileToggel] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [groupToggel, setGroupToggel] = useState(false);
  const [chatToggel, setChatToggel] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  let [selectedChat, setSelectedChat] = useState();
  let [allMessages, setAllMessages] = useState([]);
  const [commingRecieverId, setCommingRecieverId] = useState('')
  const [updateMessageId, setUpdateMessageId] = useState('')
  const [linkShowMsgWithUseEffect, setLinkShowMsgWithUseEffect] = useState('')
  const [user, setUser] = useState()
  const [userData, setUserData] = useState()
  const [socket, setSocket] = useState(null);

  console.log('Home rerender !!!!! 🚧');

  // socket connection
  useEffect(() => {
    setSocket(io("https://chat-backend-node-js-socket.onrender.com", {
    // setSocket(io("http://localhost:3600", {
      withCredentials: true,
    }))
    console.log("socket: 🎨🎨🎨", socket);
  }, []);

  // get all users and chates when open home page for the first time
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
    getAllUsersHandler();
    console.log('user: ', user);
  }, []);

  useEffect(() => {
    getAllGroupsHandler();
  }, [user])

  // get all messages to show in chat
  const handleChatMessages = async (user = null) => {
    console.log('comm id in function ', user);
    setLinkShowMsgWithUseEffect(new Date())

    if (user) {
      setCommingRecieverId(user.id)
      setSelectedChat(user)
    }
  };

  useEffect(() => {
    async function fetchData() {
      console.log('comming id🛵', commingRecieverId);

      let chatId = null
      let recieverId = null

      if (commingRecieverId) {
        console.log("we are in comming reciver id");
        chatId = null
        recieverId = commingRecieverId
      } else {
        chatId = selectedChat?._id
        recieverId = selectedChat?.participants[0]._id
      }

      const { data } = await getAllMessages({
        chatId,
        recieverId
      });
      console.log("line 106", data);
      setAllMessages(data);
    }
    fetchData()
    handleToggle('')
  }, [commingRecieverId, selectedChat, linkShowMsgWithUseEffect])

  // get all users in app
  const getAllUsersHandler = async () => {
    const { data } = await getAllUsers();
    setAllUsers(data);
    console.log('these are users: ', data);
  };

  //get all chats between this user and others with only the last message
  const getAllGroupsHandler = async () => {
    console.log("in get all groups handler");
    const { data } = await getAllGroups();

    if (user) {
      let modifiedData = data.map((c) => {
        if (c.isGroup == false) {
          c = {
            ...c,
            chatName: c.participants.find(p => user.id !== p._id)?.fullName || c.chatName,
            chatPic: c.participants.find(p => user.id !== p._id)?.profilePic || c.chatPic
          };
        }
        return c;
      })
      console.log(modifiedData);
      setAllGroups(modifiedData);
    }

    // handleChatMessages()
  };

  // send message || create message for the first time
  const createNewMessageHandler = async () => {
    console.log("message 💁‍♂️🧏‍♂️", message);
    if (!message.trim()) return;
    // console.log("sending now");

    let chatId = null
    let recieverId = null

    if (commingRecieverId) {
      // console.log("we are in comming reciver id from socket ");
      chatId = null
      recieverId = commingRecieverId
    } else {
      chatId = selectedChat._id
      recieverId = selectedChat.participants[0]._id
    }

    // console.log({ chatid: chatId, userId: userId, recieverId: recieverId, msg: "from sending function" });

    socket.emit('sendMessage', {
      message: message,
      chatId,
      recieverId,
      userId
    });

    // setAllMessages(prevMessages => [...prevMessages, message]);
    if (commingRecieverId) {
      console.log('reciving message fires 🚩🚩🚩');
    }
    // handleChatMessages();
    setMessage('');
    // getAllGroupsHandler();
    // setUpdateMessageId('')
  }


  // set message comes from socket to show it in chat box
  useEffect(() => {
    console.log("front useeffect socke line 179");
    socket?.on('sendMessage', (newMessage) => {
      console.log("from socket recieving message 🛹🛹🛹🛹", newMessage);
      console.log("from socket recieving message 🛹🛹🛹🛹", selectedChat);
      if (newMessage.chatId === selectedChat._id) {
        setAllMessages(prevMessages => [...prevMessages, newMessage]);
      } else if (newMessage.recieverId === selectedChat.id) {
        setAllMessages(prevMessages => [...prevMessages, newMessage]);
      }
      // getAllGroupsHandler()

      setAllGroups(prevGroups => prevGroups.map(group => {
        if (group._id === selectedChat._id) {
          // Update the lastMessage of the matching chat
          return {
            ...group,
            lastMessage: newMessage
          };
        }
        return group;
      }));

      socket?.on('deleteMessage', ({ messageId }) => {
        // Remove the deleted message from state
        console.log("socket delete message <<<>>>", messageId);
        setAllMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
      });
    });



    console.log("all groups line 191 🔇🔇", allGroups);
    return () => {
      socket?.off('sendMessage');
    };
  })

  const joinChatRoom = (chatId) => {
    socket.emit('joinChatRoom', { chatId });
  };

  useEffect(() => {
    if (selectedChat) {
      joinChatRoom(selectedChat._id);
    }
  }, [selectedChat]);

  // set the selected chat that i have clicked on to selectedChat variable
  const handelChat = async (chat) => {
    setSelectedChat(chat);
    setCommingRecieverId(null)
    setUserData(chat)
    handleToggle('')
  };

  // when i select chat i show its messages
  useEffect(() => {
    if (selectedChat) {
      handleChatMessages();
    }
  }, [selectedChat]);

  // userProfile is true or false only 
  const getUserProfile = (u = null) => {
    if (u == "user") {
      if (userData == user) {
        // userProfile = !userProfile;
        handleToggle('userProfile')
        setUserProfile(!userProfileToggel);
      }
      setUserData(user)
      console.log("🚃🚈🚅🦼 from here", user);
    } else {
      if (userData != user) {
        // userProfile = !userProfile;
        handleToggle('chatProfile')
        setUserProfile(!userProfileToggel);
      }
      console.log("data of selected chat line 253=>>>", selectedChat);
      setUserData(selectedChat)
    }
  };

  // fire when send, it set message to massage var. so i can use it to send and show
  const handelMessageChange = (body) => {
    setMessage(body);
    console.log("setMessage form home 🧽🧽🧽", body);
  };

  // delete specific message when click in the first 15 mins
  const handleMessageDelete = async (data) => {
    try {
      console.log('deleting message=>>><<<', data);
      // const response = await deleteMessage(data);
      // console.log(response);
      socket.emit('deleteMessage', data )
      handleChatMessages()
      getAllGroupsHandler()
    } catch (error) {
      console.log(error);
      console.log("🚫", error.response.data.message);
    }
  };

  // update specific message when click in the first 15 mins
  const handleMessageUpdate = async () => {
    try {
      const response = await updatingMessage(updateMessageId, message)
      console.log("upating message", response);
      setMessage(''); //empty message field
      handleChatMessages(); // show messages in chat box
      setUpdateMessageId('') //remove message id so i can create new message
    } catch (error) {
      console.log(error);
    }
  }

  // set the message i want to update to message 
  const handleSetUpdateMessage = (message, messageId) => {
    setMessage(message)
    setUpdateMessageId(messageId)
  }

  //hovering 
  const onHover = () => {
    setHover(!hover);
  };

  const handleToggle = (key) => {
    console.log("iam in defalut🎠🎫🖼🎞🎗");

    switch (key) {
      case "connection":
        setGroupToggel(false);
        setChatToggel(false);
        setUserProfileToggel(false)
        setconnectionToggel(!connectionToggel);
        break;
      case "group":
        setUserProfileToggel(false)
        setconnectionToggel(false);
        setChatToggel(false);
        setGroupToggel(!groupToggel);
        break;
      case "chat":
        setUserProfileToggel(false)
        setconnectionToggel(false);
        setGroupToggel(false);
        setChatToggel(!chatToggel);
        break;
      case "userProfile":
        setUserProfileToggel(!userProfileToggel)
        setconnectionToggel(false);
        setGroupToggel(false);
        setChatToggel(false);
        break;
      case "chatProfile":
        setUserProfileToggel(!userProfileToggel)
        setconnectionToggel(false);
        setGroupToggel(false);
        setChatToggel(false);
        break;
      default:
        setUserProfileToggel(false)
        setconnectionToggel(false);
        setGroupToggel(false);
        setChatToggel(false);
        break;
    }
  }

  const createGroupHandler = async () => {
    handleToggle('group');
    getAllGroupsHandler();
  };

  // render 
  return (
    <div className="flex justify-between relative items-center ">
      {/* Side Nave */}
      <div className="w-1/12 h-screen flex flex-col justify-between items-center">
        {/* logo */}
        <div>
          <Logo />
        </div>

        {/* left 3 icons */}
        <div className="w-full h-44 flex flex-col justify-between items-center">
          {/* old chats */}
          <div className=" w-4/6 h-10 rounded-md hover:bg-gray-100 flex justify-center items-center  ">
            <GrGroup
              className=" cursor-pointer text-gray-500 color text-2xl hover:text-gray-950"
              onClick={() => handleToggle("group")}
            />
          </div>
          {/* all contacts */}
          <div className=" w-4/6 h-10 rounded-md hover:bg-gray-100 flex justify-center items-center ">
            <IoChatbubblesOutline
              onClick={() => handleToggle("chat")}
              className=" cursor-pointer color text-gray-500 text-2xl  hover:text-gray-950"
            />
          </div>
          {/* create Group */}
          <div className=" w-4/6 h-10 rounded-md hover:bg-gray-100 flex justify-center items-center ">
            <FaRegUser
              onClick={() => handleToggle("connection")}
              className=" cursor-pointer text-gray-500  color hover:text-gray-950 text-2xl"
            />
          </div>
        </div>

        {/* current user icon and component to show data */}
        <div className="flex flex-col justify-center items-center">
          <div className="avatar online mt-8 mb-2">
            <div className="w-10 rounded-full">
              <img src={user?.profilePic} onClick={() => getUserProfile('user')} />
            </div>
          </div>
        </div>
      </div>

      {/* Chat box */}
      <div className="w-11/12 flex justify-center ">

        {/* Old chats popup section first icon on left */}
        <div
          className={` ${groupToggel ? "lg:w-3/12 w-full" : "w-0"
            } transition-all bg-gray-100  h-screen  z-20 `}
        >
          <Group handelChat={handelChat} allGroups={allGroups} />
        </div>

        {/* Contacts popup section second icon on left */}
        <div
          className={` ${chatToggel ? "lg:w-3/12 w-full" : "w-0"
            } transition-all bg-gray-100 h-screen overflow-y-hidden z-30 `}
        >
          <Chats
            handleChatMessages={handleChatMessages}
            ALL_USERS={allUsers}
          />
        </div>

        {/* Create chat popup section last icon on left */}
        <div
          className={` ${connectionToggel ? "lg:w-3/12 w-full" : "w-0"
            } transition-all bg-gray-100 h-screen z-10 `}
        >
          <AllConnections
            ALL_USERS={allUsers}
            onCreateGroup={createGroupHandler}
          />
        </div>

        {/* Show user profile, reciever profile and chats -which i dont want it- */}
        <div className={`h-screen md:inline-block ${userProfileToggel ? "md:w-3/12 block md:min-w-[210px] sm:max-w-[210px] md:max-w-full w-full" : "w-0 hidden"} `}>
          {userProfileToggel ? (
            <UserProfile
              getUserProfile={getUserProfile}
              userData={userData}
              setUser={setUser}
              getAllGroupsHandler={getAllGroupsHandler}
              getAllUsersHandler={getAllUsersHandler} />
          ) : <></>
            //  <Message // chats on left but not popup
            //   handelChat={handelChat}
            //   allGroups={allGroups}
            // /> 
          }
        </div>

        <div className={`h-screen hidden sm:block max-sm:hiddenmd:inline-block
         ${!userProfileToggel && !connectionToggel && !groupToggel && !chatToggel
            ? "lg:w-3/12" : "w-0"} `}>
          <Message // chats on left but not popup
            handelChat={handelChat}
            allGroups={allGroups}
          />
        </div>

        {/* chat header, messages box, and input section */}
        <div className={`lg:w-9/12 sm:block w-screen h-screen flex flex-col justify-between ${userProfileToggel || connectionToggel || groupToggel || chatToggel
          ? "hidden" : "block"} `}>
          {selectedChat || commingRecieverId ? (
            <>
              <div>
                <ChatHeader
                  getUserProfile={getUserProfile}
                  selectedChat={selectedChat}
                />
              </div>
              <div className="flex-1 p-2 px-2 h-4/6 md:h-[79vh]">
                <ChatMessage
                  // key={CURRENT_USER.userId}
                  // CURRENT_USER={CURRENT_USER} // dont need it
                  // message={MESSAGE} //delete this
                  onHover={onHover}
                  selectedChat={selectedChat}
                  allMessages={allMessages}
                  userId={userId}
                  handleMessageDelete={handleMessageDelete}
                  handleMessageUpdate={handleMessageUpdate}
                  handleSetUpdateMessage={handleSetUpdateMessage}
                />
              </div>
              <div>
                <ChatFooter
                  key={message.userId}
                  handelMessageChange={handelMessageChange}
                  setMessage={setMessage}
                  message={message}
                  createNewMessageHandler={createNewMessageHandler}
                  updateMessageId={updateMessageId}
                  handleMessageUpdate={handleMessageUpdate}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex justify-center items-center">
              <StartMessage onClickButton={() => handleToggle("connection")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

