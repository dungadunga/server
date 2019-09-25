import { Request, Response, NextFunction } from "express";

import Info from "@Model/info.model";
import User from "@Model/user.model";

import CustomError from "@Middleware/error/customError";

const getInfo = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  try {
    const info: Info | undefined = await Info.findOne({
      where: { user_pk: user.pk }
    });

    if (!info) {
      next(new CustomError({ name: 'Not_Found' }));
    }
    res.json({
      success: true,
      data: {
        info,
      }
    })

  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }))
  }

};

export default getInfo;