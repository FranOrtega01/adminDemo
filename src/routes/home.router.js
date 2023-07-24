import { Router } from 'express';
import { transport } from '../utils.js'
import config from '../config/config.js'
import fetch from 'node-fetch';

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
        if (emptyFields?.length > 0) return res.status(400).json({ status: 'error', message: 'Please fill in all the fields.' })


        const html = `
            <h2>Email de contacto</h2>
            <p><b>Nombre: </b> ${name} </p>
            <p><b>Email: </b> ${email} </p>
            <p><b>Numero: </b> ${number} </p>
            <p><b>Empresa: </b> ${enterprise} </p>
            <p><b>Mensaje: </b> ${message} </p>
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

router.post("/verify-recaptcha", (req, res) => {
    const token = req.body.token;

    // Realizar una solicitud POST a la API de verificación de reCAPTCHA de Google
    fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${config.reCaptchaKey}&response=${token}`,
    })
        .then((response) => response.json())
        .then((data) => {
            const { success } = data;

            if (success) {
                // El token es válido, procede con el procesamiento del formulario
                res.status(200).send({ status:'success'});
            } else {
                // El token no es válido, probablemente enviado por un bot
                res.status(400).json({status:'error', error: "Error de verificación de reCAPTCHA" });
            }
        })
        .catch((error) => {
            // Error en la verificación
            res.status(500).json({ error: "Error del servidor" });
        });
});
export default router