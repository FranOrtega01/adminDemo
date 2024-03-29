import { Router } from 'express';
import { authenticateTokenHeader,authenticateTokenParam, __dirname } from '../utils.js';
import {sendEmail, sendEmailPost,sendToken,authorizateToken } from '../DAO/controller/preService.controller.js'
import { upload } from '../services/multer.js'

const router = Router()

router.post('/:token/send',authenticateTokenParam, upload.any(), sendEmail)

router.post('/:token/send-post',authenticateTokenParam, upload.any(), sendEmailPost)

router.get('/generate-token', sendToken);

router.post('/authorizate-token',authenticateTokenHeader,authorizateToken)
export default router