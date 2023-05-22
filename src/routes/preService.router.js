import { Router } from 'express';
import { sendEmail } from '../DAO/controller/preService.controller.js';

const router = Router()

router.post('/send', sendEmail)

export default router