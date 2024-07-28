import express from 'express'
import * as controller from '../controller/contract'
const multer = require('multer');

const upload = multer();
const router = express.Router()

router.post('/all',upload.none(), controller.getContract)
router.post('/add',upload.none(), controller.addContract)

export default router 