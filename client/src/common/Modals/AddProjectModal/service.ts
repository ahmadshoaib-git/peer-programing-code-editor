// import axios from "src/utils/http";
import axios from "axios";
import { BASE_URL } from "src/utils";
import { ContributorData } from "./Forms/addProjectForm";

const addProject = async (
  name: String,
  contributors: Array<ContributorData>,
  ownerEmail: String
) => {
  const creds = {
    projectDetail: {
      name: name,
    },
    contributor: contributors,
    ownerEmail: ownerEmail,
  };
  return await axios({
    method: "POST",
    url: `${BASE_URL}/project`,
    data: creds,
  });
};

export { addProject };
