"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const users_1 = __importDefault(require("./routers/users"));
const utils_1 = require("./utils");
require("dotenv").config();
// const mongoString = process.env.DATABASE_URL || "";
const mongoString = "mongodb://localhost:27017/CodePeerDB";
console.log("Mongo String >", mongoString);
mongoose_1.default.connect(mongoString);
const database = mongoose_1.default.connection;
exports.database = database;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    console.log("a user connected");
});
app.use(express_1.default.json());
app.use(users_1.default);
app.use((0, cors_1.default)());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
io.on("connect", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
        // const { error, user } =
        // ({ id: socket.client.id, name, room });
        // if (error) return callback({ error: err });
        // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        // socket.join(user.room);
        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });
    socket.on("sendMessage", (message, callback) => {
        // const user = getUser(socket.id);
        // if (!user) return;
        // io.to(user.room).emit('message', { user: user.name, text: message });
        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });
    socket.on("disconnect", () => {
        // const user = removeUser(socket.id);
        // if (user) io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });
    });
});
app.listen(utils_1.PORT, () => {
    console.log(`Connected successfully on port ${utils_1.PORT}`);
});
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
