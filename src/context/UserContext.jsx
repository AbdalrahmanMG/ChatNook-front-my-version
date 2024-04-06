import { createContext, useState } from "react";
export const userContext = createContext();
export function UserContextProvider(props) {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  return (
    <userContext.Provider
      value={{ userToken, setUserToken, userId, setUserId }}
    >
      {props.children}
    </userContext.Provider>
  );
}
