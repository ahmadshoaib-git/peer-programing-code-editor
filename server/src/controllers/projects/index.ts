import { Request, Response } from "express";
import { ProjectModel, UserModel } from "../../models";
import {
  createStructure,
  getInitialCodeData,
  getInitialCodeDataAppIndex,
} from "./reactJsCode";
import { v4 } from "uuid";
import path from "path";
const fs = require("fs");
const fsPromise = require("fs/promises");

const CODE_DIR_NAME = "codeFiles";
const FILE_TREE_NAME = "fileTree.js";
const FILES_CODE_NAME = "filesCode.js";

async function createProject(req: Request, res: Response) {
  const createAndSaveProjectInUser = async (reqData: any) => {
    const getProjectData = async (userData: any) => {
      console.log("userData >", userData);
      let data = new ProjectModel({});
      if (reqData?.contributor?.length > 0)
        data = new ProjectModel({
          projectDetail: reqData.projectDetail,
          contributor: reqData.contributor,
          ownerId: userData[0]._id,
          ownerEmail: userData[0].email,
          ownerName: userData[0].name,
        });
      else
        data = new ProjectModel({
          projectDetail: reqData.projectDetail,
          ownerId: userData[0]._id,
          ownerEmail: userData[0].email,
          ownerName: userData[0].name,
        });
      const tempData = await data.save();
      return tempData;
    };
    const userData = await UserModel.find({ email: req?.body.ownerEmail });
    console.log("userData >", userData);
    const projectData = await getProjectData(userData);
    userData[0].projects.push(projectData._id);
    const dirPath = `${CODE_DIR_NAME}/${projectData._id.toString()}`;
    const dirFileTree = `${dirPath}/${FILE_TREE_NAME}`;
    const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
    const uuid1 = v4();
    const uuid2 = v4();
    const uuid3 = v4();
    // await fs.mkdirSync(dirPath);
    await fs.mkdir(path.resolve(dirPath), { recursive: true }, (e: any) => {
      if (e) {
        console.error(e);
        throw e;
      } else {
        fs.writeFile(
          dirFileTree,
          JSON.stringify(createStructure(uuid1, uuid2, uuid3)),
          function (err: any) {
            if (err) {
              console.log(err);
              throw err;
            }
            console.log(`${dirFileTree} was created and data was saved`);
            fs.writeFile(
              dirFilesCode,
              JSON.stringify(getInitialCodeDataAppIndex(uuid2, uuid3)),
              function (err: any) {
                if (err) {
                  console.log(err);
                  throw err;
                }
                console.log(`${dirFilesCode} was created and data was saved`);
              }
            );
          }
        );
      }
    });
    return userData[0].save();
  };
  try {
    // console.log(req.body.ownerEmail);
    // console.log(req.body.contributor);
    // console.log(req.body.projectDetail);
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

async function getProjectData(req: Request, res: Response) {
  try {
    const { id } = req.query;
    const projects = await ProjectModel.find({
      _id: id,
    });
    if (!projects || projects?.length === 0) throw "Project not found!";
    // console.log("projects >", projects);
    const selectedProject = projects[0];
    const dirPath = `${CODE_DIR_NAME}/${selectedProject._id.toString()}`;
    const dirFileTree = `${dirPath}/${FILE_TREE_NAME}`;
    const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
    const fileTree = await fsPromise.readFile(dirFileTree, {
      encoding: "utf8",
    });
    const filesCode = await fsPromise.readFile(dirFilesCode, {
      encoding: "utf8",
    });
    selectedProject.projectDetail.fileTree = fileTree;
    selectedProject.projectDetail.filesCode = filesCode;

    // console.log(fileTree, filesCode);
    return res.status(200).json(selectedProject);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function getprojectsByUserEmail(req: Request, res: Response) {
  try {
    const { email } = req.query;
    if (!email) throw "Invalid request! Email cant be empty.";
    // console.log(email);
    const users = await UserModel.find({
      email: email,
    }).sort({ updated_at: -1 });
    // let users: any;
    // await UserModel.find(
    //   {},
    //   [],
    //   { sort: [["arrival", -1]] },
    //   function (err, fetchedUser) {
    //     console.log("fetchedUser >", fetchedUser);
    //     console.log("err >", err);
    //     users = fetchedUser;
    //   }
    // );
    if (!users || users?.length === 0) throw "User not found!";
    // console.log(users);
    const projects = await ProjectModel.find({
      ownerId: users[0]._id,
    });
    // console.log(projects);
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
    // console.log(projectId);
    // console.log(ownerId);
    // console.log(contributors);
    const projects = await ProjectModel.find({
      _id: projectId,
      ownerId: ownerId,
    });
    // console.log(projects);
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
    const { email } = req.query;
    if (!email) throw "Invalid request! Email cant be empty.";
    // console.log(email);
    const projects = await ProjectModel.find({
      "contributor.email": email,
    });
    const data = projects?.map((project) => {
      return {
        _id: project._id,
        ownerId: project.ownerId,
        projectDetail: project.projectDetail,
        contributor: project.contributor,
        ownerEmail: project.ownerEmail,
        ownerName: project.ownerName,
      };
    });
    // console.log(data);
    return res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function getProjectNodesUUID(req: Request, res: Response) {
  try {
    const { email } = req.query;
    if (!email) throw "Invalid request! Email cant be empty.";
    // console.log(email);
    const projects = await ProjectModel.find({
      // "contributor.email": email,
      $or: [
        {
          "contributor.email": email,
        },
        {
          ownerEmail: email,
        },
      ],
    });
    if (projects?.length > 0) {
      const data = {
        nodeId: v4(),
      };
      // console.log(data);
      return res.status(200).json(data);
    } else {
      return res.status(400).json({ message: "No user record found!" });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function getProjectFileData(req: Request, res: Response) {
  try {
    const { projectId, fileId } = req.query;
    const projects = await ProjectModel.find({
      _id: projectId,
    });
    if (!projects || projects?.length === 0) throw "Project not found!";
    // console.log("projects >", projects);
    const selectedProject = projects[0];
    const dirPath = `${CODE_DIR_NAME}/${selectedProject._id.toString()}`;
    const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
    const tempfilesCode = await fsPromise.readFile(dirFilesCode, {
      encoding: "utf8",
    });
    const filesCode = JSON.parse(tempfilesCode);
    let codeData = filesCode.find((file: any) => file.id === fileId);
    if (!codeData) {
      codeData = getInitialCodeData(fileId);
    }
    codeData = JSON.stringify(codeData);
    return res.status(200).json(codeData);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function saveProjectData(req: Request, res: Response) {
  try {
    const { projectId, fileTree, fileId, fileCode } = req.body;
    // console.log(projectId, fileTree, fileId, fileCode);
    const dirPath = `${CODE_DIR_NAME}/${projectId}`;
    const dirFileTree = `${dirPath}/${FILE_TREE_NAME}`;
    const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
    const tempfilesCode = await fsPromise.readFile(dirFilesCode, {
      encoding: "utf8",
    });
    let currentfilesCode = JSON.parse(tempfilesCode);
    currentfilesCode = [...currentfilesCode, { id: fileId, code: fileCode }];
    fs.writeFile(dirFileTree, JSON.stringify(fileTree), function (err: any) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(`${dirFileTree} was saved with new data`);
      fs.writeFile(
        dirFilesCode,
        JSON.stringify(currentfilesCode),
        function (err: any) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log(`${dirFilesCode} was saved with new data`);
        }
      );
    });
    const message = `File Id ${fileId} of Project Id ${projectId} created and tree modified successfully.`;
    return res.status(200).json(message);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function deleteProjectData(req: Request, res: Response) {
  try {
    const { projectId, fileTree, fileId } = req.body;
    // console.log(projectId, fileTree, fileId);
    const dirPath = `${CODE_DIR_NAME}/${projectId}`;
    const dirFileTree = `${dirPath}/${FILE_TREE_NAME}`;
    const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
    const tempfilesCode = await fsPromise.readFile(dirFilesCode, {
      encoding: "utf8",
    });
    let currentfilesCode = JSON.parse(tempfilesCode);
    currentfilesCode = currentfilesCode.filter(
      (projectFile: any) => projectFile.id !== fileId
    );
    fs.writeFile(dirFileTree, JSON.stringify(fileTree), function (err: any) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(`${dirFileTree} was modified`);
      fs.writeFile(
        dirFilesCode,
        JSON.stringify(currentfilesCode),
        function (err: any) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log(`${dirFilesCode} was modified`);
        }
      );
    });
    const message = `File Id ${fileId} of Project Id ${projectId} has been deleted successfully.`;
    return res.status(200).json(message);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function saveFileData(req: Request, res: Response) {
  try {
    const { projectId, fileId, fileCode } = req.body;
    // console.log(projectId, fileId, fileCode);
    const dirPath = `${CODE_DIR_NAME}/${projectId}`;
    const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
    const tempfilesCode = await fsPromise.readFile(dirFilesCode, {
      encoding: "utf8",
    });
    let currentfilesCode = JSON.parse(tempfilesCode);
    currentfilesCode = currentfilesCode.map((projectFileData: any) => {
      if (projectFileData.id === fileId) {
        return {
          id: projectFileData.id,
          code: fileCode,
        };
      }
      return projectFileData;
    });
    fs.writeFile(
      dirFilesCode,
      JSON.stringify(currentfilesCode),
      function (err: any) {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log(`${dirFilesCode} was updated`);
      }
    );
    const message = `File Id ${fileId} of Project Id ${projectId} created and tree modified successfully.`;
    return res.status(200).json(message);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function saveFileFolderName(req: Request, res: Response) {
  try {
    const { projectId, fileTree, fileId, fileName } = req.body;
    // console.log(projectId, fileTree, fileId, fileName);
    const dirPath = `${CODE_DIR_NAME}/${projectId}`;
    const dirFileTree = `${dirPath}/${FILE_TREE_NAME}`;
    const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
    const tempfilesCode = await fsPromise.readFile(dirFilesCode, {
      encoding: "utf8",
    });

    fs.writeFile(dirFileTree, JSON.stringify(fileTree), function (err: any) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(`${dirFileTree} was saved with new data`);
      // fs.writeFile(
      //   dirFilesCode,
      //   JSON.stringify(currentfilesCode),
      //   function (err: any) {
      //     if (err) {
      //       console.log(err);
      //       throw err;
      //     }
      //     console.log(`${dirFilesCode} was saved with new data`);
      //   }
      // );
    });
    const message = `Document Id ${fileId} of Project Id ${projectId} name has been modified successfully to ${fileName}`;
    return res.status(200).json(message);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

const ProjectController = {
  createProject,
  getProjectData,
  getAllProjects,
  getProjectsByOwnerId,
  getProjectById,
  addContributors,
  getProjectsByContributorsEmail,
  getprojectsByUserEmail,
  getProjectNodesUUID,
  getProjectFileData,
  saveProjectData,
  deleteProjectData,
  saveFileData,
  saveFileFolderName,
};

export default ProjectController;
