"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_errors_1 = __importDefault(require("http-errors"));
const req_validator_1 = require("./req.validator");
const index_1 = require("../../models/index");
const utils_1 = require("../../utils");
const auth_1 = require("../../middlewares/auth");
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
        const check = req_validator_1.registerUserReqSchema.validate({ name, password, email });
        console.log(check);
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(password, salt);
        console.log("Hash >", hash);
        const tempData = await saveData(name, email, hash);
        let data = {
            email: tempData.email,
            name: tempData.name,
            userId: tempData._id,
        };
        const token = await (0, auth_1.generateJWT)(data, "8h");
        data["token"] = token;
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
async function userLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        const check = req_validator_1.loginUserReqSchema.validate({ email, password });
        if (check.error)
            return (0, http_errors_1.default)(400, check.error.message);
        const users = await index_1.UserModel.findOne({
            email: email,
        });
        if (!users || users?.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(req.body.password, users.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong email or password!" });
        }
        const clonedUser = JSON.parse(JSON.stringify(users));
        delete clonedUser["password"];
        delete clonedUser["passcode"];
        delete clonedUser["confirmed"];
        delete clonedUser["projects"];
        const token = await (0, auth_1.generateJWT)(clonedUser, "8h");
        clonedUser["token"] = token;
        return res.status(200).json(clonedUser);
    }
    catch (err) {
        const message = (0, utils_1.getErrorMessage)(err);
        console.log("Error >>", message);
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
