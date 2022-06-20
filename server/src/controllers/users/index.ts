import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import { loginUserReqSchema, registerUserReqSchema } from "./req.validator";
import { UserModel } from "../../models/index";
import { getErrorMessage } from "../../utils";
import { generateJWT } from "../../middlewares/auth";

const jwtSecretKey = "Asfoi94293894kj4";
async function createUser(req: Request, res: Response) {
  const saveData = async (name: string, email: string, password: string) => {
    const data = new UserModel({
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
    const check = registerUserReqSchema.validate({ name, password, email });
    console.log(check);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    console.log("Hash >", hash);
    const tempData = await saveData(name, email, hash);
    let data: any = {
      email: tempData.email,
      name: tempData.name,
      userId: tempData._id,
    };
    const token = await generateJWT(data, "8h");
    data["token"] = token;
    return res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function userConfirmation(req: Request, res: Response) {
  try {
    const { password, passcode, email } = req.body;
    const users = await UserModel.find({
      email: email,
    });
    if (users[0].passcode === passcode) {
      users[0].password = password;
      users[0].confirmed = true;
      users[0].save();
      return res.status(200).json("Password Updated");
    } else return res.status(401).json("OK");
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function userLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const check = loginUserReqSchema.validate({ email, password });
    if (check.error) return createError(400, check.error.message);
    const users = await UserModel.findOne({
      email: email,
    });

    if (!users || users?.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      users.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong email or password!" });
    }
    const clonedUser = JSON.parse(JSON.stringify(users));
    delete clonedUser["password"];
    delete clonedUser["passcode"];
    delete clonedUser["confirmed"];
    delete clonedUser["projects"];
    const token = await generateJWT(clonedUser, "8h");
    clonedUser["token"] = token;
    return res.status(200).json(clonedUser);
  } catch (err: any) {
    const message = getErrorMessage(err);
    console.log("Error >>", message);
    return res.status(400).json({ message: message });
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
}

async function getUserById(req: Request, res: Response) {
  try {
    const projects = await UserModel.find({ _id: req.body.userId });
    return res.status(200).json(projects);
  } catch (err: any) {
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

export default UserController;
