import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '@Model/user.model';

dotenv.config();

export type TokenDecoded = { pk: number; }

const issueToken = (req: Request, res: Response) => {
  const user: User = res.locals.user;
  const secret: string = process.env.TOKEN_SECRET;

  const token: string = jwt.sign(
    {
      pk: user.pk,
    },
    secret,
  );

  res.json({
    success: true,
    data: {
      token
    },
  });
};

export default issueToken;