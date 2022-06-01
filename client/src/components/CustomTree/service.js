// import axios from "src/utils/http";
import axios from "axios";
import { BASE_URL } from "src/utils";

const getNodeId = async (email) => {
  return await axios({
    method: "GET",
    url: `${BASE_URL}/project/getNewNodeId?email=${email}`,
  });
};

export { getNodeId };
