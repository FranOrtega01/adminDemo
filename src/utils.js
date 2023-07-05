import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)
import jwt from 'jsonwebtoken'

import config from '../src/config/config.js'
import nodemailer from 'nodemailer'

export default __dirname

// Transport Email (gmail)
export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAppEmail,
        pass: config.gmailAppKey,
    }
})
export const generateToken = () => {
    const secretKey = config.jwtSign;
    const token = jwt.sign({ valid: true }, secretKey);

    return token;
};

// Middleware para verificar la validez del token
export const authenticateToken = (req, res, next) => {
    console.log('entro');
    const {token} = req.params;

    // Verifica si el token es válido
    try {
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, secretKey);

        // Comprueba si el token es válido
        if (decodedToken) {
            // Token válido, pasa al siguiente middleware o ruta
            next();
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};