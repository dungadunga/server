import { Request, Response, NextFunction } from "express";

import { _facebook, OauthResponse } from "./oAuth";
import CustomError from "@Middleware/error/customError";

interface Header {
  [token: string]: string | string[] | undefined;
}

interface Body {
  platform?: 'facebook' | 'google';
}

const checkOauth = async (req: Request, res: Response, next: NextFunction) => {
  const { token }: Header = req.headers;
  const { platform }: Body = req.body;

  if (!token || !platform) {
    next();

    return;
  } else if (Array.isArray(token)) {
    next(new CustomError({ name: 'Wrong_Data' }))
  } else {
    let response: OauthResponse;

    if (platform === 'facebook') {

      try {
        response = await _facebook(token); 
      } catch (error) {
        next(new CustomError({ name: 'Wrong_Request' }));
      }
    }
    
    res.locals.temp = { ...res.locals.temp, ...response };
    next();
  }
};

export default checkOauth;