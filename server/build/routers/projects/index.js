"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const auth_1 = require("../../middlewares/auth");
const ProjectRouter = express_1.default.Router();
ProjectRouter.get("/", auth_1.verifyAuth, controllers_1.ProjectController.getAllProjects);
ProjectRouter.post("/", auth_1.verifyAuth, controllers_1.ProjectController.createProject);
ProjectRouter.get("/projectsByOwnerId", auth_1.verifyAuth, controllers_1.ProjectController.getProjectsByOwnerId);
ProjectRouter.get("/projectById", auth_1.verifyAuth, controllers_1.ProjectController.getProjectById);
ProjectRouter.post("/addContributors", auth_1.verifyAuth, controllers_1.ProjectController.addContributors);
ProjectRouter.get("/user", auth_1.verifyAuth, controllers_1.ProjectController.getprojectsByUserEmail);
ProjectRouter.get("/contributedProject", auth_1.verifyAuth, controllers_1.ProjectController.getProjectsByContributorsEmail);
ProjectRouter.get("/individual", auth_1.verifyAuth, controllers_1.ProjectController.getProjectData);
ProjectRouter.get("/getNewNodeId", auth_1.verifyAuth, controllers_1.ProjectController.getProjectNodesUUID);
ProjectRouter.get("/getProjectFileData", auth_1.verifyAuth, controllers_1.ProjectController.getProjectFileData);
ProjectRouter.post("/saveProjectData", auth_1.verifyAuth, controllers_1.ProjectController.saveProjectData);
ProjectRouter.post("/saveFileData", auth_1.verifyAuth, controllers_1.ProjectController.saveFileData);
ProjectRouter.post("/editFileFolderName", auth_1.verifyAuth, controllers_1.ProjectController.saveFileFolderName);
ProjectRouter.post("/deleteProjectData", auth_1.verifyAuth, controllers_1.ProjectController.deleteProjectData);
ProjectRouter.get("/allProjectFilesData", auth_1.verifyAuth, controllers_1.ProjectController.getProjectsAllFilesData);
ProjectRouter.post("/saveDependencyFile", auth_1.verifyAuth, controllers_1.ProjectController.saveDependencyFile);
ProjectRouter.get("/getProjectDependencies", auth_1.verifyAuth, controllers_1.ProjectController.getProjectDependencies);
// getProjectDependencies saveDependencyFile
exports.default = ProjectRouter;
