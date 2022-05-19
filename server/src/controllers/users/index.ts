import { Request, Response } from "express";
import { UserModel } from "../../models/index";

async function createUser(req: Request, res: Response) {
  const saveData = async (name: string, email: string) => {
    const data = new UserModel({ name: name, email: email });
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
};

export default UserController;
