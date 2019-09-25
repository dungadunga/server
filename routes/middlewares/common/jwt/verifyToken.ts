import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import CustomError from '@Middleware/error/customError';

import { TokenDecoded } from './issueToken';

dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token: string | string[] = req.headers.authorization;
  const secret: string = process.env.TOKEN_SECRET;

  if (!token) {
    next(new CustomError({ name: 'Wrong_Request' }));
  }

  try {
    const decoded: TokenDecoded = await jwt.verify(token.toString(), secret) as TokenDecoded;
    res.locals.user = decoded;
    next();
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        next(new CustomError({ name: 'Token_Expired' }));
        break;
      case 'JsonWebTokenError':
        next(new CustomError({ name: 'Wrong_Request' }));
        break;
      default:
        next(new CustomError({ name: 'Unhandled_Error' }));
        break;
    }
  }
};

export default verifyToken;