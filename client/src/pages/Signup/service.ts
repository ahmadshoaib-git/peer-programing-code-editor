import axios from "src/utils/http";
import { BASE_URL } from "src/utils";

const callSignup = async (
  userName: String,
  email: String,
  password: String
) => {
  const creds = {
    name: userName,
    email: email,
    password: password,
  };
  return await axios<any>({
    method: "POST",
    url: `${BASE_URL}/user`,
    data: creds,
  });
};

export { callSignup };
