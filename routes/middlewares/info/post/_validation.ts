import { ValidationChain, body } from "express-validator";

const postInfoValidation: ValidationChain[] = [
  body('temperature').isString(),
  body('humidity').isString(),
  body('feel').isString(),
];

export default postInfoValidation;