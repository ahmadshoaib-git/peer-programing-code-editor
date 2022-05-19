"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    return res.send("Server is up & running...");
});
router.post("/create-user-room", (req, res) => {
    try {
        console.log("======================<>====================");
        console.log(req.body.name);
        console.log(req.body.email);
        console.log("======================<>====================");
    }
    catch (err) {
        console.log(err);
        console.log("======================<>====================");
    }
    return res.send("Ok");
});
exports.default = router;
