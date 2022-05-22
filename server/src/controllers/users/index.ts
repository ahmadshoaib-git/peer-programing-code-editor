import { Request, Response } from "express";
import { UserModel } from "../../models/index";

async function createUser(req: Request, res: Response) {
  const saveData = async (name: string, email: string) => {
    const data = new UserModel({
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

async function userLogin(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const users = await UserModel.find({
      name: name,
      email: email,
      password: password,
    });
    const clonedUser = JSON.parse(JSON.stringify(users[0]));
    delete clonedUser["password"];
    delete clonedUser["passcode"];
    delete clonedUser["confirmed"];
    return res.status(200).json(clonedUser);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.message });
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
