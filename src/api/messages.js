import axios from "./request";

export const getAllUsers = () => {
  return axios.get("/contacts");
};
export const getAllMessages = (data) => {
  return axios.post(`/message/get`, data);
};
export const sendMessage = (data) => {
  return axios.post(`/message/send`, data);
};
export const deleteMessage = (messageId) => {
  // console.log('data in auth', data);
  return axios.delete("/message/delete", {data: {messageId}});
};
export const updatingMessage = (messageId, message) => {
  // console.log('data in auth', data);
  return axios.patch("/message/update", {data: {messageId, message}});
};
export const changeProfilePic = (id) => {
  return axios.patch("/user/changepic", id);
};
export const getAllGroups = () => {
  return axios.get(`/contacts/chats`);
};
export const createGroup = (data) => {
  return axios.post("/contacts/chats/create", data);
};
