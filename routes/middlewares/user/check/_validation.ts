import { ValidationChain, query } from "express-validator";

const userCheckValidation: ValidationChain[] = [
  query('email').isString(),
];

export default userCheckValidation;