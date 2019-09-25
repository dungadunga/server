import { Router } from "express";

// Validation
import checkValidation from "@Middleware/common/checkValidation";
import verifyToken from "@Middleware/common/jwt/verifyToken";
import getUserFromToken from "@Middleware/common/jwt/getUserFromToken";
import postInfoValidation from "@Middleware/info/post/_validation";

// Info
import getInfo from "@Middleware/info/get/getInfo";

// Post
import postInfo from "@Middleware/info/post/postInfo";

const infoController: Router = Router();

infoController.use(verifyToken, getUserFromToken);
infoController.post('/', postInfoValidation)

infoController.use(checkValidation)

infoController.get('/', getInfo);
infoController.post('/', postInfo);

export default infoController;
