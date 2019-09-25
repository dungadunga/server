import { Request, Response, NextFunction } from "express";

import CustomError from "@Middleware/error/customError";

import User from "@Model/user.model";

interface Body {
  email: string;
  password: string;
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: Body = req.body;

  try {
    const user: User | undefined = await User.findOne({ where: { email, password }});

    if (!user) {
      next(new CustomError({ name: 'Wrong_Data', message: '아이디 또는 비밀번호를 잘못입력하셨습니다.' }));
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getUser;
