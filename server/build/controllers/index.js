"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = exports.UserController = void 0;
const users_1 = __importDefault(require("./users"));
exports.UserController = users_1.default;
const projects_1 = __importDefault(require("./projects"));
exports.ProjectController = projects_1.default;
