import express from "express";
import { ProjectController } from "../../controllers";
import { verifyAuth } from "../../middlewares/auth";
const ProjectRouter = express.Router();

ProjectRouter.get("/", verifyAuth, ProjectController.getAllProjects);
ProjectRouter.post("/", verifyAuth, ProjectController.createProject);
ProjectRouter.get(
  "/projectsByOwnerId",
  verifyAuth,
  ProjectController.getProjectsByOwnerId
);
ProjectRouter.get("/projectById", verifyAuth, ProjectController.getProjectById);
ProjectRouter.post(
  "/addContributors",
  verifyAuth,
  ProjectController.addContributors
);
ProjectRouter.get(
  "/user",
  verifyAuth,
  ProjectController.getprojectsByUserEmail
);
ProjectRouter.get(
  "/contributedProject",
  verifyAuth,
  ProjectController.getProjectsByContributorsEmail
);
ProjectRouter.get("/individual", verifyAuth, ProjectController.getProjectData);
ProjectRouter.get(
  "/getNewNodeId",
  verifyAuth,
  ProjectController.getProjectNodesUUID
);
ProjectRouter.get(
  "/getProjectFileData",
  verifyAuth,
  ProjectController.getProjectFileData
);
ProjectRouter.post(
  "/saveProjectData",
  verifyAuth,
  ProjectController.saveProjectData
);
ProjectRouter.post("/saveFileData", verifyAuth, ProjectController.saveFileData);
ProjectRouter.post(
  "/editFileFolderName",
  verifyAuth,
  ProjectController.saveFileFolderName
);

ProjectRouter.post(
  "/deleteProjectData",
  verifyAuth,
  ProjectController.deleteProjectData
);

ProjectRouter.get(
  "/allProjectFilesData",
  verifyAuth,
  ProjectController.getProjectsAllFilesData
);

// getProjectsByContributorsEmail getProjectData getProjectFileData deleteProjectData getProjectsAllFilesData
export default ProjectRouter;
