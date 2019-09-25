import { Router } from "express";

// common
import verifyToken from "@Middleware/common/jwt/verifyToken";
import getUserFromToken from "@Middleware/common/jwt/getUserFromToken";
import checkValidation from "@Middleware/common/checkValidation";

// Validation
import postDiaryValidation from "@Middleware/diary/post/_validation";

// Get
import getDiary from "@Middleware/diary/get/getDiary";

// Post
import postDiary from "@Middleware/diary/post/postDiary";
import postDiaryMulter from "@Middleware/diary/post/postDiaryMulter";
import postDiaryImage from "@Middleware/diary/post/postDiaryImage";

// Delete
import deleteDiary from "@Middleware/diary/delete/deleteDiary";

const diaryController: Router = Router();

diaryController.use(verifyToken, getUserFromToken);
diaryController.post('/', postDiaryMulter, postDiaryValidation);

diaryController.use(checkValidation);

diaryController.get('/', getDiary);
diaryController.post('/', postDiaryImage, postDiary);
diaryController.delete('/', deleteDiary)

export default diaryController;