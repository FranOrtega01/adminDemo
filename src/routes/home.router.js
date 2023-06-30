import { Router } from 'express';
import { sendEmail } from '../DAO/controller/preService.controller.js';
import { transport } from '../utils.js'
import config from '../config/config.js'

const router = Router()

// router.post('/send', sendEmail)
router.post('/send', async (req, res) => {

    try {
        const { name, email, number, enterprise, subject, message } = req.body


        let emptyFields = [];
        if (!name) {
            emptyFields.push('name')
        }
        if (!email) {
            emptyFields.push('email')
        }
        if (!number) {
            emptyFields.push('number')
        }
        if (!enterprise) {
            emptyFields.push('enterprise')
        }
        if (!subject) {
            emptyFields.push('subject')
        }
        if (!message) {
            emptyFields.push('message')
        }
        if(emptyFields?.length > 0) return res.status(400).json({status: 'error', message: 'Please fill in all the fields.'})


        const html = `
            <h2>Email de prueba</h2>
            ${name}
            ${email}
            ${number}
            ${enterprise}
            ${message}
        `

        const result = await transport.sendMail({
            from: config.gmailAppEmail,
            to: "franortega.wg@gmail.com",
            subject: subject,
            html
        })
        return res.status(200).json({ status: "success", message: "Email sent!" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Something went wrong! Please try again later or send an email manually." })
    }

})
export default router