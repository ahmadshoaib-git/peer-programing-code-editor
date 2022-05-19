"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
// import { database } from "../../index";
const users_1 = __importDefault(require("../../models/users"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    return res.send("Server is up & running...");
});
router.post("/create-user", async (req, res) => {
    const saveData = async (name, email) => {
        const key = (0, uuid_1.v4)();
        console.log(`key > ${key}`);
        const data = new users_1.default({
            userId: (0, uuid_1.v4)(),
            owner: { name: name, email: email },
            // projects: [],
            // projects: {
            //   projectId: uuidv4(),
            //   projectDetail: {},
            //   contributor: [],
            // },
        });
        const tempData = await data.save();
        return tempData;
    };
    try {
        const { name, email } = req.body;
        console.log(name);
        console.log(email);
        const tempData = await saveData(name, email);
        console.log(`tempData >${tempData}`);
        return res.status(200).json(tempData);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
});
router.get("/users", async (req, res) => {
    // const getUsers = async () => await database.getCollection("users");
    const users = await users_1.default.find();
    try {
        return res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
});
exports.default = router;
