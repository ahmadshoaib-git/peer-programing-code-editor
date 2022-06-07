import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "src/redux/slices/auth";
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

const responseInterceptor = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        console.log(error);
        localStorage.clear();
        const dispatch = useDispatch();
        dispatch(setLoggedIn({ loggedIn: false }));
        window.location.href = "/login";
        Notify(`${error.response.data}`, "error");
      }
    }
  );
};

export { jwtInterceptor, responseInterceptor };
