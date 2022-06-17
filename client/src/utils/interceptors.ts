import axios from "axios";
import { Notify } from "src/components";
const jwtInterceptor = () => {
  axios.interceptors.request.use((request: any) => {
    const jwt = localStorage.getItem("token") || "";
    if (jwt) {
      request.headers["x-access-token"] = `Bearer ${jwt}`;
    }

    return request;
  });
};

const responseInterceptor = (callback: () => void) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("==>> ", error);
      if (!error.response) {
        // Show a generic error Toast (e.g. Server error, please retry)
        return Promise.reject(error);
      }
      if (error.response.status === 401) {
        console.log(error);
        localStorage.clear();
        Notify(`${error.response.data}`, "error");
        callback();
      }
      return Promise.reject(error);
    }
  );
};

export { jwtInterceptor, responseInterceptor };
