import packageJson from "../../package.json";
const AppYear = () => new Date().getFullYear();
const { version } = packageJson;

export { AppYear, version };
