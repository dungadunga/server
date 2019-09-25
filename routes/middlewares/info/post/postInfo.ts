import { Request, Response, NextFunction } from "express";

import Info from "@Model/info.model";
import User from "@Model/user.model";

import CustomError from "@Middleware/error/customError";

interface Body {
  temperature: string;
  humidity: string;
  feel: string;
}

const postInfo = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const { temperature, humidity, feel }: Body = req.body;

  try {
    const [info, infoCreated]: [Info, boolean] = await Info.findOrCreate({
      where: { user_pk: user.pk },
      defaults: { user_pk: user.pk, temperature, humidity, feel },
    });
  
    if (!infoCreated) {
      await info.update({ temperature, humidity, feel });
    }
    
    res.json({
      success: true,
    })
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }))
  }
};

export default postInfo;