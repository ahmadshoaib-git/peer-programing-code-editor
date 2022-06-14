import express, { Application, Request, Response } from "express";
import cors from "cors";
import http from "http";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { UserRouter, ProjectRouter } from "./routers";
import { PORT } from "./utils";
import { establishSockets } from "./sockets";
import "./db";
const router = express.Router();
require("dotenv").config();

router.get("/", (req, res) => {
  return res.send("Server is up & running...");
});

const app: Application = express();

app.use(express.json());

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/user", UserRouter);
app.use("/api/project", ProjectRouter);

export { mongoose };

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(process.env.NODE_ENV);
  console.log(`Connected successfully on port ${PORT}`);
});

const server = http.createServer(app);
establishSockets(server);
