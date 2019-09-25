import { Router } from "express";

// Validation
import postUserValidation from "@Middleware/user/post/_validation";

// Common
import checkValidation from "@Middleware/common/checkValidation";
import issueToken from "@Middleware/common/jwt/issueToken";
import checkDuplicateUser from "@Middleware/user/post/checkDuplicateUser";

// Get
import getUser from "@Middleware/user/get/getUser";
import getUserValidation from "@Middleware/user/get/_validation";

// Post
import postUser from "@Middleware/user/post/postUser";

// Check
import userCheckValidation from "@Middleware/user/check/_validation";

const userController: Router = Router();

userController.get('/', getUserValidation);
userController.post('/', postUserValidation);
userController.get('/check/email', userCheckValidation);

userController.use('/', checkValidation);

userController.get('/', getUser, issueToken);
userController.post('/', checkDuplicateUser('register'), postUser);
userController.get('/check/email', checkDuplicateUser('check'));

export default userController;