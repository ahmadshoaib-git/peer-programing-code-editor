import express, { Application, Request, Response } from "express";
import cors from "cors";
import http from "http";
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
app.use("/api/user", UserRouter);
app.use("/api/project", ProjectRouter);

export { mongoose };
app.listen(PORT, () => {
  console.log(`Connected successfully on port ${PORT}`);
});

const server = http.createServer(app);
establishSockets(server);
