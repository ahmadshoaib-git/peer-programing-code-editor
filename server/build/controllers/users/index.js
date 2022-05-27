"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../../models/index");
const utils_1 = require("../../utils");
const jwtSecretKey = "Asfoi94293894kj4";
async function createUser(req, res) {
    const saveData = async (name, email, password) => {
        const data = new index_1.UserModel({
            name: name,
            email: email,
            passcode: "123456",
            password: password,
            confirmed: true,
        });
        const tempData = await data.save();
        return tempData;
    };
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        const tempData = await saveData(name, email, password);
        // console.log(`tempData :${tempData}`);
        // sa
        let data = {
            email: tempData.email,
            name: tempData.name,
            userId: tempData._id,
        };
        const token = await jsonwebtoken_1.default.sign(data, jwtSecretKey, {
            expiresIn: "2h",
        });
        // const token = jwt.sign(data, jwtSecretKey);
        data["token"] = token;
        console.log(`>> token :${token}`);
        console.log(`>> data :${data}`);
        return res.status(200).json(data);
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
        const { email, password } = req.body;
        const users = await index_1.UserModel.find({
            email: email,
            password: password,
        });
        if (!users || users?.length === 0)
            throw "User not found! Please register new user.";
        console.log(users, users[0]);
        const clonedUser = JSON.parse(JSON.stringify(users[0]));
        delete clonedUser["password"];
        delete clonedUser["passcode"];
        delete clonedUser["confirmed"];
        const token = await jsonwebtoken_1.default.sign(clonedUser, jwtSecretKey, {
            expiresIn: "2h",
        });
        clonedUser["token"] = token;
        console.log(`>> token :${token}`);
        console.log(`>> clonedUser :${clonedUser}`);
        return res.status(200).json(clonedUser);
    }
    catch (err) {
        const message = (0, utils_1.getErrorMessage)(err);
        console.log(message);
        return res.status(400).json({ message: message });
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
