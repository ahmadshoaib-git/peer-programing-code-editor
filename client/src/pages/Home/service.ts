// import axios from "src/utils/http";
import axios from "axios";
import { BASE_URL } from "src/utils";

const getProjects = async (email: String) => {
  const creds = {
    params: {
      email: email,
    },
  };

  return await axios({
    method: "GET",
    url: `${BASE_URL}/project/user?email=${email}`,
    // url: `/user/login`,
    // data: creds,
    // headers: {
    //   "user-agent": "not axios",
    // },
  });
};

export { getProjects };
