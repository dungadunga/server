import { body, ValidationChain } from "express-validator";

const postDiaryValidation = [
  body('content').isString(),
]

export default postDiaryValidation;