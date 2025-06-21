import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../Types/extendedRequest";

const validatJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  //FIRST STEP => this func bring the authHeader from Fron-End
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization Header not Provided...!");
    return;
  }

  //SECOND SYEP => split the authHeader ["bearer","token"] and take the secend index[1]
  const token = authorizationHeader.split(" ")[1];

  // Verify the token (token === undefined || token === null || token === '' ) same logic
  if (!token) {
    res.sendStatus(401).send("Bearer of Token not Valid");
    return;
  }

  // THIRD STEP => VERIFY THE TOKEN

  jwt.verify(
    token,
    process.env.JWT_SECRET || "", async (err, payload) => {
      if (err) {
        res.status(403).send("Invalid Token");
        return;
      }
      if (!payload) {
        res.status(403).send("Invalid Token Payload");
      }

      // fetch user from Database based on the payload

      const UserPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };
      const user = await userModel.findOne({ email: UserPayload.email });
      req.user = user;
      next();

      // STEP FOUR => Use the Func Next()
    }
  );
};

export default validatJWT;
