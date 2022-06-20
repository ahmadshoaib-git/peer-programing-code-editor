"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const reactJsCode_1 = require("./reactJsCode");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs = require("fs");
const fsPromise = require("fs/promises");
const CODE_DIR_NAME = "codeFiles";
const FILE_TREE_NAME = "fileTree.js";
const FILES_CODE_NAME = "filesCode.js";
async function createProject(req, res) {
    const createAndSaveProjectInUser = async (reqData) => {
        const getProjectData = async (userData) => {
            let data = new models_1.ProjectModel({});
            if (reqData?.contributor?.length > 0)
                data = new models_1.ProjectModel({
                    projectDetail: reqData.projectDetail,
                    contributor: reqData.contributor,
                    ownerId: userData[0]._id,
                    ownerEmail: userData[0].email,
                    ownerName: userData[0].name,
                });
            else
                data = new models_1.ProjectModel({
                    projectDetail: reqData.projectDetail,
                    ownerId: userData[0]._id,
                    ownerEmail: userData[0].email,
                    ownerName: userData[0].name,
                });
            const tempData = await data.save();
            return tempData;
        };
        const userData = await models_1.UserModel.find({ email: req?.body.ownerEmail });
        const projectData = await getProjectData(userData);
        userData[0].projects.push(projectData._id);
        const dirPath = `${CODE_DIR_NAME}/${projectData._id.toString()}`;
        const dirFileTree = `${dirPath}/${FILE_TREE_NAME}`;
        const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
        const uuid1 = (0, uuid_1.v4)();
        const uuid2 = (0, uuid_1.v4)();
        const uuid3 = (0, uuid_1.v4)();
        // await fs.mkdirSync(dirPath);
        await fs.mkdir(path_1.default.resolve(dirPath), { recursive: true }, (e) => {
            if (e) {
                console.error(e);
                throw e;
            }
            else {
                fs.writeFile(dirFileTree, JSON.stringify((0, reactJsCode_1.createStructure)(uuid1, uuid2, uuid3)), function (err) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    console.log(`${dirFileTree} was created and data was saved`);
                    fs.writeFile(dirFilesCode, JSON.stringify((0, reactJsCode_1.getInitialCodeDataAppIndex)(uuid2, uuid3)), function (err) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        console.log(`${dirFilesCode} was created and data was saved`);
                    });
                });
            }
        });
        return userData[0].save();
    };
    try {
        const tempUser = await createAndSaveProjectInUser(req.body);
        return res.status(200).json(tempUser);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function getAllProjects(req, res) {
    try {
        const projects = await models_1.ProjectModel.find();
        return res.status(200).json(projects);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function getProjectData(req, res) {
    try {
        const { id } = req.query;
        const projects = await models_1.ProjectModel.find({
            _id: id,
        });
        if (!projects || projects?.length === 0)
            throw "Project not found!";
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
        return res.status(200).json(selectedProject);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function getprojectsByUserEmail(req, res) {
    try {
        const { email } = req.query;
        if (!email)
            throw "Invalid request! Email cant be empty.";
        const users = await models_1.UserModel.find({
            email: email,
        }).sort({ updated_at: -1 });
        if (!users || users?.length === 0)
            throw "User not found!";
        const projects = await models_1.ProjectModel.find({
            ownerId: users[0]._id,
        });
        return res.status(200).json(projects);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err || err.message });
    }
}
async function getProjectsByOwnerId(req, res) {
    try {
        const projects = await models_1.ProjectModel.find({ ownerId: req.body.ownerId });
        return res.status(200).json(projects);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function getProjectById(req, res) {
    try {
        const projects = await models_1.ProjectModel.find({ _id: req.body.projectId });
        return res.status(200).json(projects);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function addContributors(req, res) {
    try {
        const { projectId, ownerId, contributors } = req.body;
        const projects = await models_1.ProjectModel.find({
            _id: projectId,
            ownerId: ownerId,
        });
        projects[0].contributor = [...projects[0].contributor, ...contributors];
        const data = await projects[0].save();
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function getProjectsByContributorsEmail(req, res) {
    try {
        const { email } = req.query;
        if (!email)
            throw "Invalid request! Email cant be empty.";
        const projects = await models_1.ProjectModel.find({
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
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function getProjectNodesUUID(req, res) {
    try {
        const { email } = req.query;
        if (!email)
            throw "Invalid request! Email cant be empty.";
        const projects = await models_1.ProjectModel.find({
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
                nodeId: (0, uuid_1.v4)(),
            };
            return res.status(200).json(data);
        }
        else {
            return res.status(400).json({ message: "No user record found!" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function getProjectFileData(req, res) {
    try {
        const { projectId, fileId } = req.query;
        const projects = await models_1.ProjectModel.find({
            _id: projectId,
        });
        if (!projects || projects?.length === 0)
            throw "Project not found!";
        const selectedProject = projects[0];
        const dirPath = `${CODE_DIR_NAME}/${selectedProject._id.toString()}`;
        const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
        const tempfilesCode = await fsPromise.readFile(dirFilesCode, {
            encoding: "utf8",
        });
        const filesCode = JSON.parse(tempfilesCode);
        let codeData = filesCode.find((file) => file.id === fileId);
        if (!codeData) {
            codeData = (0, reactJsCode_1.getInitialCodeData)(fileId);
        }
        codeData = JSON.stringify(codeData);
        return res.status(200).json(codeData);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function saveProjectData(req, res) {
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
        fs.writeFile(dirFileTree, JSON.stringify(fileTree), function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(`${dirFileTree} was saved with new data`);
            fs.writeFile(dirFilesCode, JSON.stringify(currentfilesCode), function (err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log(`${dirFilesCode} was saved with new data`);
            });
        });
        const message = `File Id ${fileId} of Project Id ${projectId} created and tree modified successfully.`;
        return res.status(200).json(message);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function deleteProjectData(req, res) {
    try {
        const { projectId, fileTree, fileId } = req.body;
        const dirPath = `${CODE_DIR_NAME}/${projectId}`;
        const dirFileTree = `${dirPath}/${FILE_TREE_NAME}`;
        const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
        const tempfilesCode = await fsPromise.readFile(dirFilesCode, {
            encoding: "utf8",
        });
        let currentfilesCode = JSON.parse(tempfilesCode);
        currentfilesCode = currentfilesCode.filter((projectFile) => projectFile.id !== fileId);
        fs.writeFile(dirFileTree, JSON.stringify(fileTree), function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(`${dirFileTree} was modified`);
            fs.writeFile(dirFilesCode, JSON.stringify(currentfilesCode), function (err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log(`${dirFilesCode} was modified`);
            });
        });
        const message = `File Id ${fileId} of Project Id ${projectId} has been deleted successfully.`;
        return res.status(200).json(message);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function saveFileData(req, res) {
    try {
        const { projectId, fileId, fileCode } = req.body;
        // console.log(projectId, fileId, fileCode);
        const dirPath = `${CODE_DIR_NAME}/${projectId}`;
        const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
        const tempfilesCode = await fsPromise.readFile(dirFilesCode, {
            encoding: "utf8",
        });
        let currentfilesCode = JSON.parse(tempfilesCode);
        currentfilesCode = currentfilesCode.map((projectFileData) => {
            if (projectFileData.id === fileId) {
                return {
                    id: projectFileData.id,
                    code: fileCode,
                };
            }
            return projectFileData;
        });
        fs.writeFile(dirFilesCode, JSON.stringify(currentfilesCode), function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(`${dirFilesCode} was updated`);
        });
        const message = `File Id ${fileId} of Project Id ${projectId} created and tree modified successfully.`;
        return res.status(200).json(message);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function saveFileFolderName(req, res) {
    try {
        const { projectId, fileTree, fileId, fileName } = req.body;
        const dirPath = `${CODE_DIR_NAME}/${projectId}`;
        const dirFileTree = `${dirPath}/${FILE_TREE_NAME}`;
        const dirFilesCode = `${dirPath}/${FILES_CODE_NAME}`;
        const tempfilesCode = await fsPromise.readFile(dirFilesCode, {
            encoding: "utf8",
        });
        fs.writeFile(dirFileTree, JSON.stringify(fileTree), function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(`${dirFileTree} was saved with new data`);
        });
        const message = `Document Id ${fileId} of Project Id ${projectId} name has been modified successfully to ${fileName}`;
        return res.status(200).json(message);
    }
    catch (err) {
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
exports.default = ProjectController;
