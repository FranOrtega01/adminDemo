import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)
import jwt from 'jsonwebtoken'

import config from '../src/config/config.js'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import passport from 'passport'

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

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// Check if password is valid
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

// Cookies Token Extract
export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[config.jwtCookie] : null
}


export const generatePreserviceToken = (time) => {
    const token = jwt.sign({ valid: true }, config.jwtSign, { expiresIn: time })
    return token
}
export const generateUserToken = (user, time) => {
    const token = jwt.sign({ user }, config.jwtSign, { expiresIn: time })
    return token
}

// Middleware para verificar la validez del token
export const authenticateTokenParam = (req, res, next) => {
    const { token } = req.params;
    const secretKey = config.jwtSign;
    console.log(token);
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

// Middleware para verificar la validez del token
export const authenticateTokenHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const secretKey = config.jwtSign;

    console.log(token);
    try {
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, secretKey);

        if (decodedToken) {
            next();
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Rol authorization

export const authorization = (role) => {
    return async (req, res, next) => {
        const user = req.user?.user;
        if (!user) return res.status(401).send({ status: 'error', error: "Unauthorized" });
        if (!role.includes(user.role)) return res.status(403).send({ status: 'error', error: 'No Permission' })
        next();
    }
}

// Passport
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ status: 'error', error: info.messages ? info.messages : info.toString() })
            };
            req.user = user;
            next();
        })(req, res, next)
    }
}
