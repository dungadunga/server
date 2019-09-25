import { ValidationChain, body } from "express-validator";

const getUserValidation: ValidationChain[] = [
  body('email').isString(),
  body('password').isString(),
];

export default getUserValidation;
