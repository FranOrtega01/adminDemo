import { Router } from 'express';
import { authenticateTokenHeader,authenticateTokenParam, __dirname } from '../utils.js';
import {sendEmail,sendToken,authorizateToken } from '../DAO/controller/preService.controller.js'
import { upload } from '../services/multer.js'

const router = Router()

router.post('/:token/send',authenticateTokenParam, upload.any(), sendEmail)

router.get('/generate-token', sendToken);

router.post('/authorizate-token',authenticateTokenHeader,authorizateToken)
export default router