import { Request, Response, NextFunction } from "express";

import { TokenDecoded } from "./issueToken";

import User from "@Model/user.model";
import CustomError from "@Middleware/error/customError";


const getUserFromToken = async (req: Request, res: Response, next: NextFunction) => {
  const user: TokenDecoded = res.locals.user;

  try {
    res.locals.user = await User.findOne({
      where: {
        pK: user.pk,
      }
    })
    next();
  } catch (error) {
    console.log(error)
    next(new CustomError({ name: 'Database_Error' }))
  }
};

export default getUserFromToken;