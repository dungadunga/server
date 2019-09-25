import { Request, Response, NextFunction } from "express";

import Diary from "@Model/diary.model";
import CustomError from "@Middleware/error/customError";
import User from "@Model/user.model";
import DiaryImage from "@Model/diaryImage.model";

interface Body {
  content: string;
}

const S3_URL = 'https://dungadunga.s3.ap-northeast-2.amazonaws.com/diary-image/';

const postDiary = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const files: Array<string> = (res.locals.temp && res.locals.temp.files) || [];

  const { content }: Body = req.body;

  try {
    const diary: Diary = await Diary.create({
      user_pk: user.pk,
      content,
      image: files.map((file) => ({ url: S3_URL + file })),
    }, {
      include: [{ model: DiaryImage }],
    });

    res.json({
      success: true,
      data: {
        diary,
      }
    })
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }))
  }
};

export default postDiary;