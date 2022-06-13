import packageJson from "../../package.json";
const AppYear = () => new Date().getFullYear();
const { version } = packageJson;
const BASE_URL = "http://localhost:8081/api";
const SOCKET_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8082" : "/";
export { AppYear, version, BASE_URL, SOCKET_URL };
