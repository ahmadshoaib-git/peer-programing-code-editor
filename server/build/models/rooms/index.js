"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const userDetailSchema = new mongoose_1.default.Schema({
    email: {
        required: true,
        unique: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
});
const RoomSchema = new mongoose_1.default.Schema({
    id: {
        required: true,
        unique: true,
        type: String,
    },
    projectId: {
        required: true,
        type: String,
    },
    activeUsers: [userDetailSchema],
});
exports.default = mongoose_1.default.model("Rooms", RoomSchema);
