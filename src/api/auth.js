import axios from "./request";

export const login = (data) => {
  return axios.post("/user/login", data);
};
export const registration = (data) => {
  return axios.post("/user/signup", data);
};
export const logout = (data) => {
  return axios.post("/user/logout", data);
};
export const editProfile = (data) => {
  return axios.patch("/user/editprofile", data);
};

