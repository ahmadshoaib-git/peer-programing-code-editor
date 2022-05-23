"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
async function createUser(req, res) {
    const saveData = async (name, email) => {
        const data = new index_1.UserModel({
            name: name,
            email: email,
            passcode: "123456",
            password: "123456",
            confirmed: true,
        });
        const tempData = await data.save();
        return tempData;
    };
    try {
        const { name, email } = req.body;
        console.log(req.body);
        const tempData = await saveData(name, email);
        console.log(`tempData :${tempData}`);
        return res.status(200).json(tempData);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function userConfirmation(req, res) {
    try {
        const { password, passcode, email } = req.body;
        const users = await index_1.UserModel.find({
            email: email,
        });
        if (users[0].passcode === passcode) {
            users[0].password = password;
            users[0].confirmed = true;
            users[0].save();
            return res.status(200).json("Password Updated");
        }
        else
            return res.status(401).json("OK");
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function userLogin(req, res) {
    try {
        const { name, email, password } = req.body;
        const users = await index_1.UserModel.find({
            name: name,
            email: email,
            password: password,
        });
        const clonedUser = JSON.parse(JSON.stringify(users[0]));
        delete clonedUser["password"];
        delete clonedUser["passcode"];
        delete clonedUser["confirmed"];
        return res.status(200).json(clonedUser);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function getUsers(req, res) {
    try {
        const users = await index_1.UserModel.find();
        return res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
async function getUserById(req, res) {
    try {
        const projects = await index_1.UserModel.find({ _id: req.body.userId });
        return res.status(200).json(projects);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
}
const UserController = {
    createUser,
    getUsers,
    getUserById,
    userLogin,
};
exports.default = UserController;
