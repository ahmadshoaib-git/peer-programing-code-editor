import axios from "axios";
import { BASE_URL } from "src/utils";

const getProjectById = async (id: String) => {
  return await axios({
    method: "GET",
    url: `${BASE_URL}/project/individual?id=${id}`,
  });
};

const getProjectFileDataById = async (projectId: String, fileId: String) => {
  return await axios({
    method: "GET",
    url: `${BASE_URL}/project/getProjectFileData?projectId=${projectId}&fileId=${fileId}`,
  });
};

export { getProjectById, getProjectFileDataById };
