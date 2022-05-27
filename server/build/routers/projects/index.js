"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const ProjectRouter = express_1.default.Router();
ProjectRouter.get("/", controllers_1.ProjectController.getAllProjects);
ProjectRouter.post("/", controllers_1.ProjectController.createProject);
ProjectRouter.get("/projectsByOwnerId", controllers_1.ProjectController.getProjectsByOwnerId);
ProjectRouter.get("/projectById", controllers_1.ProjectController.getProjectById);
ProjectRouter.post("/addContributors", controllers_1.ProjectController.addContributors);
ProjectRouter.get("/user", controllers_1.ProjectController.getprojectsByUserEmail);
ProjectRouter.get("/contributedProject", controllers_1.ProjectController.getProjectsByContributorsEmail);
// getProjectsByContributorsEmail
exports.default = ProjectRouter;
