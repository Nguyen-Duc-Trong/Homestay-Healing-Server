import express from 'express'
const multer = require('multer');
import * as authController from "../controller/auth"
import * as changeInfoController from "../controller/changeInfo"
import { uploadFile } from "../controller/upload";
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
        files: 1,
    },
});
const router = express.Router()
router.post('/register' ,upload.none(),  authController.register) 
router.post('/login' ,upload.none(),  authController.login) 
router.post('/changeInfo' , upload.single('avatar'),changeInfoController.changeInfo) 
router.post("/upload", upload.single("file"), uploadFile);
export default router