const isProduction = process.env.NODE_ENV === "production";
const url = isProduction ? process.env.PUBLIC_URL : "localhost:27017";
const name = isProduction ? process.env.PROJECT_NAME : "CodePeerDB";
const config = {
  db: {
    url: url,
    name: name,
  },
};

export default config;
