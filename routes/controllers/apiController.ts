import { Router } from "express";

// common 
import getStatus from "@Middleware/common/getStatus";

import userController from "./user.controller";
import infoController from "./info.controller";
import diaryController from "./diary.controller";

const router: Router = Router();

router.get('/status', getStatus);

router.use('/user', userController);
router.use('/info', infoController);
router.use('/diary', diaryController);

export default router;