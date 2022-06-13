import express from "express";
import { UserController } from "../../controllers";
const UserRouter = express.Router();

UserRouter.post("/login", UserController.userLogin);
UserRouter.get("/", UserController.getUsers);
UserRouter.post("/", UserController.createUser);
UserRouter.get("/userById", UserController.getUserById);

export default UserRouter;
