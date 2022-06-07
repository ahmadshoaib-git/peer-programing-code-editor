import express, { Application, Request, Response } from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { UserRouter, ProjectRouter } from "./routers";
import { PORT } from "./utils";
import "./db";
const router = express.Router();
require("dotenv").config();

router.get("/", (req, res) => {
  return res.send("Server is up & running...");
});

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

app.use(express.json());

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", UserRouter);
app.use("/project", ProjectRouter);

export { mongoose };
app.listen(PORT, () => {
  console.log(`Connected successfully on port ${PORT}`);
});

// io.on("connect", (socket) => {
//   socket.on("join", ({ name, room }, callback) => {
//     // const { error, user } =
//     // ({ id: socket.client.id, name, room });
//     // if (error) return callback({ error: err });
//     // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
//     // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
//     // socket.join(user.room);
//     // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//     callback();
//   });
//   socket.on("sendMessage", (message, callback) => {
//     // const user = getUser(socket.id);
//     // if (!user) return;
//     // io.to(user.room).emit('message', { user: user.name, text: message });
//     // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//     callback();
//   });
//   socket.on("disconnect", () => {
//     // const user = removeUser(socket.id);
//     // if (user) io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });
//   });
// });

// "build": "npx tsc",
// "start": "nodemon tsc && nodemon  build/index.js",

// const express = require('express'), cors = require('cors'), socketio = require('socket.io'), http = require('http'), router = require('./router');
// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
// const app = express(), server = http.createServer(app), io = socketio(server);

// io.on('connect', (socket) => {
//     socket.on('join', ({ name, room }, callback) => {
//         const { error, user } = addUser({ id: socket.client.id, name, room });
//         if (error) return callback({ error: err });
//         socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
//         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
//         socket.join(user.room);
//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//         callback();
//     });
//     socket.on('sendMessage', (message, callback) => {
//         const user = getUser(socket.id);
//         if (!user) return;
//         io.to(user.room).emit('message', { user: user.name, text: message });
//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//         callback();
//     });
//     socket.on('disconnect', () => {
//         const user = removeUser(socket.id);
//         if (user) io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });
//     });
// });
