import { Request, Response, NextFunction } from "express";

import User from "@Model/user.model";
import CustomError from "@Middleware/error/customError";

import { deleteUndefined } from "@Lib/utils";

import { OauthResponse } from "./oAuth";


interface Body {
  email: string;
  password: string;
  phone: string;
}

type Temp = Partial<OauthResponse>;

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, phone }: Body  = req.body;
  let temp: Temp;

  if (res.locals.temp) {
    temp = res.locals.temp as Temp;
  }

  const insertClause = { email, password, phone, ...temp };
  deleteUndefined(insertClause);

  try {
    console.log(insertClause);
    await User.create(insertClause);

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }))
  }
};

export default postUser;