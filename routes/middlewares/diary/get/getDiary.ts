import { Request, Response, NextFunction } from "express";

import CustomError from "@Middleware/error/customError";

import Diary from "@Model/diary.model";
import User from "@Model/user.model";
import DiaryImage from "@Model/diaryImage.model";

const getDiary = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  try {
    const diaries: Diary[] = 
      await Diary.findAll({
        where: { user_pk: user.pk },
        order: [['createdAt', 'DESC']],
        include: [{
          model: DiaryImage,
        }]
      });

    res.json({
      success: true,
      data: {
        diary: diaries,
      }
    })
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }))
  }
};

export default getDiary;