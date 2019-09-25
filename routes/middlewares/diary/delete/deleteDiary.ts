import { Request, Response, NextFunction } from "express";

import CustomError from "@Middleware/error/customError";

import User from "@Model/user.model";
import Diary from "@Model/diary.model";

interface Query {
  diary_pk: number;
}

const deleteDiary = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const { diary_pk }: Query = req.query;

  try {
    const deleteRowsCount: number = await Diary.destroy({ where: { pk: diary_pk, user_pk: user.pk } });

    if (deleteRowsCount < 1) {
      next(new CustomError({ name: 'Not_Found' }));
    } else {
      res.json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default deleteDiary;