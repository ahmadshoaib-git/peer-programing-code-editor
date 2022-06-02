import express from "express";
import { ProjectController } from "../../controllers";
const ProjectRouter = express.Router();

ProjectRouter.get("/", ProjectController.getAllProjects);
ProjectRouter.post("/", ProjectController.createProject);
ProjectRouter.get("/projectsByOwnerId", ProjectController.getProjectsByOwnerId);
ProjectRouter.get("/projectById", ProjectController.getProjectById);
ProjectRouter.post("/addContributors", ProjectController.addContributors);
ProjectRouter.get("/user", ProjectController.getprojectsByUserEmail);
ProjectRouter.get(
  "/contributedProject",
  ProjectController.getProjectsByContributorsEmail
);
ProjectRouter.get("/individual", ProjectController.getProjectData);
ProjectRouter.get("/getNewNodeId", ProjectController.getProjectNodesUUID);
ProjectRouter.get("/getProjectFileData", ProjectController.getProjectFileData);
ProjectRouter.post("/saveProjectData", ProjectController.saveProjectData);
ProjectRouter.post("/saveFileData", ProjectController.saveFileData);
ProjectRouter.post("/editFileFolderName", ProjectController.saveFileFolderName);

ProjectRouter.post("/deleteProjectData", ProjectController.deleteProjectData);
// getProjectsByContributorsEmail getProjectData getProjectFileData deleteProjectData
export default ProjectRouter;
