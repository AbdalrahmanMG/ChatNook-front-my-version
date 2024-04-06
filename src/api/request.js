import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosRequest = axios.create({
  baseURL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Step-2: Create request, response & error handlers

const requestHandler = (request) => {
  //All Our request Handler in all calls.
  request.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  return request;
};

// Case 401
const responseHandler = (response) => {
  // Ex: 401 To do logout
  //   if (response.status === 401) {
  //   }
  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
axiosRequest.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosRequest.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default axiosRequest;
