import express from "express";
import { ProjectController } from "../../controllers";
const ProjectRouter = express.Router();

ProjectRouter.get("/", ProjectController.getAllProjects);
ProjectRouter.post("/", ProjectController.createProject);
ProjectRouter.get("/projectsByOwnerId", ProjectController.getProjectsByOwnerId);
ProjectRouter.get("/projectById", ProjectController.getProjectById);
ProjectRouter.post("/addContributors", ProjectController.addContributors);
ProjectRouter.get(
  "/getprojectsByUserEmail",
  ProjectController.getprojectsByUserEmail
);
ProjectRouter.get(
  "/contributedProject",
  ProjectController.getProjectsByContributorsEmail
);
// getProjectsByContributorsEmail
export default ProjectRouter;
