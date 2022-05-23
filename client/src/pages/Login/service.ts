// import axios from "src/utils/http";
import axios from "axios";
import { BASE_URL } from "src/utils";

const callLogin = async (email: String, password: String) => {
  const creds = {
    email: email,
    password: password,
  };
  return await axios({
    method: "POST",
    url: `http://${BASE_URL}/user/login`,
    // url: `/user/login`,
    data: creds,
  });
};

export { callLogin };
