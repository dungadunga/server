import { ValidationChain, body, header } from 'express-validator'

enum PlatformEnum {
  facebook = 'facebook',
  google = 'google',
}

const postUserValidation: ValidationChain[] = [
  body('email').isString(),
  body('password').isString(),
  body('phone').isString(),

  header('token').optional().isString().custom((_, { req }) => {
    return Object.keys(PlatformEnum).includes(req.body.platform);
  })
];

export default postUserValidation;