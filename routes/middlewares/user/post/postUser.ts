import { Request, Response, NextFunction } from "express";

import User from "@Model/user.model";
import CustomError from "@Middleware/error/customError";

interface Body {
  email: string;
  password: string;
  phone: string;
}

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, phone }: Body  = req.body;

  try {
    await User.create({ email, password, phone }) 

    res.json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    next(new CustomError({ name: 'Database_Error' }))
  }
};

export default postUser;