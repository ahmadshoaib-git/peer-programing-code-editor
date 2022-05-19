import express from "express";
import { UserController } from "../../controllers";
const UserRouter = express.Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.post("/", UserController.createUser);
UserRouter.get("/userById", UserController.getUserById);

export default UserRouter;
