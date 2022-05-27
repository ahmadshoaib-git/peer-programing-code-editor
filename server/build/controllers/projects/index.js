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
                    ownerEmail: userData[0].email,
                    ownerName: userData[0].name,
                });
            else
                data = new models_1.ProjectModel({
                    projectDetail: reqData.projectDetail,
                    ownerId: userData._id,
                    ownerEmail: userData[0].email,
                    ownerName: userData[0].name,
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
async function getprojectsByUserEmail(req, res) {
    try {
        const { email } = req.query;
        if (!email)
            throw "Invalid request! Email cant be empty.";
        console.log(email);
        const users = await models_1.UserModel.find({
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
        if (!users || users?.length === 0)
            throw "User not found!";
        console.log(users);
        const projects = await models_1.ProjectModel.find({
            ownerId: users[0]._id,
        });
        console.log(projects);
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
        const { email } = req.query;
        if (!email)
            throw "Invalid request! Email cant be empty.";
        console.log(email);
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
        // const data = projects.map(async (project) => {
        //   const usersData: any = await UserModel.find({
        //     _id: project.ownerId,
        //   });
        //   project["ownerName"] = usersData.name;
        //   project["ownerEmail"] = usersData.email;
        //   return project;
        // });
        console.log(data);
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
    getprojectsByUserEmail,
};
exports.default = ProjectController;
