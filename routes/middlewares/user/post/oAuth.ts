import Axios, { AxiosResponse } from 'axios';
import CustomError from '@Middleware/error/customError';

const FB_VERIFY_TOKEN_URL = 'https://graph.facebook.com/oauth/access_token';
const FB_REDIRECT_URL = 'https://www.facebook.com/connect/login_success.html';
const FB_DEBUG_TOKEN_URL = 'https://graph.facebook.com/debug_token';

export type OauthResponse = {
  platform: 'facebook' | 'google';
  oauth_pk: number;
}

type FBTokenVerifyResponse = AxiosResponse<{
  access_token: string;
}>

type FBTokenDebugResponse = AxiosResponse<{
  data: {
    is_valid: boolean;
    user_id: number;
  }
}>

export const _facebook: (token: string) => Promise<OauthResponse> = async (token) => {
  try {
    const appToken: FBTokenVerifyResponse = await Axios.get(FB_VERIFY_TOKEN_URL, {
      params: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        redirect_uri: FB_REDIRECT_URL,
        grant_type: 'client_credentials',
      }
    })
  
    const debugToken: FBTokenDebugResponse = await Axios.get(FB_DEBUG_TOKEN_URL, {
      params: {
        input_token: token,
        access_token: appToken.data.access_token,
      },
    });
  
    if (!debugToken.data.data.is_valid) {
      throw new CustomError({ name: 'Wrong_Request' });
    }

    return ({ platform: 'facebook', oauth_pk: debugToken.data.data.user_id });
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};