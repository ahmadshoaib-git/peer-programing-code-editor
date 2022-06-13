import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getErrorMessage } from "../utils";
const SECRET_KEY = "Asfoi94293894kj4";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const newToken = token.split("Bearer ")[1];
    const decoded = jwt.verify(newToken, SECRET_KEY);
    console.log("decoded", decoded);
  } catch (err: any) {
    console.log(getErrorMessage(err));
    return res.status(401).send(getErrorMessage(err));
  }
  return next();
};

export const generateJWT = async (data: any, expiry: any) => {
  const token = await jwt.sign(data, SECRET_KEY, {
    expiresIn: expiry,
  });
  return token;
};
