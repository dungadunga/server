import { ValidationChain, body } from 'express-validator'

const postUserValidation: ValidationChain[] = [
  body('email').isString(),
  body('password').isString(),
  body('name').isString(),
];

export default postUserValidation;