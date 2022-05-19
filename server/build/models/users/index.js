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
const projectSchema = new mongoose_1.default.Schema({
    projectId: {
        required: true,
        // unique: true,
        type: String,
    },
    projectDetail: {
        required: true,
        type: Object,
    },
    contributor: [
        {
            email: {
                unique: true,
                type: String,
            },
            name: {
                required: true,
                type: String,
            },
        },
    ],
});
const UserSchema = new mongoose_1.default.Schema({
    userId: {
        required: true,
        unique: true,
        type: String,
    },
    owner: userDetailSchema,
    projects: [projectSchema],
});
exports.default = mongoose_1.default.model("Users", UserSchema);
