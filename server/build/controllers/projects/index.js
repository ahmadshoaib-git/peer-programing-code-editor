"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
async function createProject(req, res) {
    const createAndSaveProjectInUser = async (reqData) => {
        const getProjectData = async (userData) => {
            let data = new models_1.ProjectModel({});
            if (reqData?.contributor?.length > 0)
                data = new models_1.ProjectModel({
                    projectDetail: reqData.projectDetail,
                    contributor: reqData.contributor,
                    ownerId: userData[0]._id,
                });
            else
                data = new models_1.ProjectModel({
                    projectDetail: reqData.projectDetail,
                    ownerId: userData._id,
                });
            const tempData = await data.save();
            return tempData;
        };
        const userData = await models_1.UserModel.find({ email: req?.body.ownerEmail });
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
        // {
        //   projectId: "",
        //   ownerId: "",
        //   contributors:[]
        // }
        const { projectId, ownerId, contributors } = req.body;
        console.log(projectId);
        console.log(ownerId);
        console.log(contributors);
        const projects = await models_1.ProjectModel.find({
            _id: projectId,
            ownerId: ownerId,
        });
        console.log(projects);
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
        const { userEmail } = req.body;
        const projects = await models_1.ProjectModel.find({
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
    }
    catch (err) {
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
};
exports.default = ProjectController;
