import packageJson from "../../package.json";
const AppYear = () => new Date().getFullYear();
const { version } = packageJson;
const BASE_URL = "localhost:8081";

export { AppYear, version, BASE_URL };
