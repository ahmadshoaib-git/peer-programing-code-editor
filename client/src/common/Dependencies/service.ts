import axios from "axios";
import { BASE_URL } from "src/utils";

const saveNewDependency = async (
  projectId: string,
  dependencyName: string,
  dependencyCDN: string
) => {
  const creds = {
    projectId: projectId,
    dependencyName: dependencyName,
    dependencyCDN: dependencyCDN,
  };
  return await axios({
    method: "POST",
    url: `${BASE_URL}/project/saveNewDependency`,
    data: creds,
  });
};

const deleteDependency = async (projectId: string, cdn: string) => {
  const creds = {
    projectId: projectId,
    cdn: cdn,
  };
  return await axios({
    method: "DELETE",
    url: `${BASE_URL}/project/deleteProjectDependency?projectId=${projectId}&cdn=${cdn}`,
    data: creds,
  });
};

export { saveNewDependency, deleteDependency };
