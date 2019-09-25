import { Request, Response, NextFunction } from "express";

import CustomError from "@Middleware/error/customError";

import User from "@Model/user.model";

interface BodyAndQuery {
  email: string;
}

const checkDuplicateUser = (type: 'check' | 'register') => async (req: Request, res: Response, next: NextFunction) => {
  const { email }: BodyAndQuery = type === 'check' ? req.query : req.body;

  try {
    const user: User = await User.findOne({ where: { email }});

    if (type === 'check') {
      res.json({
        success: true,
        data: { 
          duplicate: Boolean(user),
        }
      });
    } else {
      if (user) {
        next(new CustomError({ name: 'Exist_User' }));
      }
      
      next();
    }


  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default checkDuplicateUser;