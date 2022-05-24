// import axios from "src/utils/http";
import axios from "axios";
import { BASE_URL } from "src/utils";

const getProjects = async (email: String) => {
  return await axios({
    method: "GET",
    url: `${BASE_URL}/project/user?email=${email}`,
  });
};

const getContributedProjects = async (email: String) => {
  return await axios({
    method: "GET",
    url: `${BASE_URL}/project/contributedProject?email=${email}`,
  });
};

export { getProjects, getContributedProjects };
