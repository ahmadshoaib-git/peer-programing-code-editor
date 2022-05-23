import { Request, Response } from "express";
import { ProjectModel, UserModel } from "../../models";

async function createProject(req: Request, res: Response) {
  const createAndSaveProjectInUser = async (reqData: any) => {
    const getProjectData = async (userData: any) => {
      let data = new ProjectModel({});
      if (reqData?.contributor?.length > 0)
        data = new ProjectModel({
          projectDetail: reqData.projectDetail,
          contributor: reqData.contributor,
          ownerId: userData[0]._id,
        });
      else
        data = new ProjectModel({
          projectDetail: reqData.projectDetail,
          ownerId: userData._id,
        });
      const tempData = await data.save();
      return tempData;
    };
    const userData = await UserModel.find({ email: req?.body.ownerEmail });
    const projectData = await getProjectData(userData);
    userData[0].projects.push(projectData._id);
    return userData[0].save();
  };
  try {
    console.log(req.body.ownerEmail);
    console.log(req.body.contributor);
    console.log(req.body.projectDetail);
    const tempUser = await createAndSaveProjectInUser(req.body);
    return res.status(200).json(tempUser);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function getAllProjects(req: Request, res: Response) {
  try {
    const projects = await ProjectModel.find();
    return res.status(200).json(projects);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function getprojectsByUserEmail(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) throw "Invalid request! Email cant be empty.";
    console.log(email);
    const users = await UserModel.find({
      email: email,
    });
    if (!users || users?.length === 0) throw "User not found!";
    console.log(users);
    const projects = await ProjectModel.find({
      ownerId: users[0]._id,
    });
    console.log(projects);
    return res.status(200).json(projects);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err || err.message });
  }
}

async function getProjectsByOwnerId(req: Request, res: Response) {
  try {
    const projects = await ProjectModel.find({ ownerId: req.body.ownerId });
    return res.status(200).json(projects);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function getProjectById(req: Request, res: Response) {
  try {
    const projects = await ProjectModel.find({ _id: req.body.projectId });
    return res.status(200).json(projects);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function addContributors(req: Request, res: Response) {
  try {
    // {
    //   projectId: "",
    //   ownerId: "",
    //   contributors:[]
    // }
    const { projectId, ownerId, contributors } = req.body;
    console.log(projectId);
    console.log(ownerId);
    console.log(contributors);
    const projects = await ProjectModel.find({
      _id: projectId,
      ownerId: ownerId,
    });
    console.log(projects);
    projects[0].contributor = [...projects[0].contributor, ...contributors];
    const data = await projects[0].save();
    return res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function getProjectsByContributorsEmail(req: Request, res: Response) {
  try {
    const { userEmail } = req.body;
    const projects = await ProjectModel.find({
      "contributor.email": userEmail,
    });
    const data = projects.map((project) => {
      return {
        _id: project._id,
        ownerId: project.ownerId,
        projectDetail: project.projectDetail,
      };
    });
    return res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

// async function abc(req: Request, res: Response) {}

const ProjectController = {
  createProject,
  getAllProjects,
  getProjectsByOwnerId,
  getProjectById,
  addContributors,
  getProjectsByContributorsEmail,
  getprojectsByUserEmail,
};

export default ProjectController;
