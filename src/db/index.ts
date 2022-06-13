import mongoose from "mongoose";
import config from "./config.db";

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`;

mongoose.connect(CONNECTION_URL);

mongoose.connection.on("connected", () => {
  console.log("Mongo has connected successfully");
});
mongoose.connection.on("reconnected", () => {
  console.log("Mongo has reconnected");
});
mongoose.connection.on("error", (error) => {
  console.log("Mongo connection has an error", error);
  mongoose.disconnect();
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongo connection is disconnected");
});

const database = mongoose.connection;
database.on("error", (error: any) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
