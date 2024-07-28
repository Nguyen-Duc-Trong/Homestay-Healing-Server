import express from 'express'
const multer = require('multer');
const upload = multer();
import * as insertController from "../controller/insert"

const router = express.Router()
router.post('/', insertController.insert)

export default router