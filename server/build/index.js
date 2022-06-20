"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const body_parser_1 = __importDefault(require("body-parser"));
const routers_1 = require("./routers");
const utils_1 = require("./utils");
const sockets_1 = require("./sockets");
require("./db");
const router = express_1.default.Router();
require("dotenv").config();
router.get("/", (req, res) => {
    return res.send("Server is up & running...");
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/api/user", routers_1.UserRouter);
app.use("/api/project", routers_1.ProjectRouter);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../client", "build")));
    app.get("*", function (request, response) {
        response.sendFile(path_1.default.resolve(__dirname, "../../client", "build", "index.html"));
    });
}
app.listen(utils_1.PORT, () => {
    console.log(`Connected successfully on port ${utils_1.PORT}`);
});
const server = http_1.default.createServer(app);
(0, sockets_1.establishSockets)(server);
