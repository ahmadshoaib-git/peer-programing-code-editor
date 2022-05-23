"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRouter = exports.UserRouter = void 0;
const users_1 = __importDefault(require("./users"));
exports.UserRouter = users_1.default;
const projects_1 = __importDefault(require("./projects"));
exports.ProjectRouter = projects_1.default;
