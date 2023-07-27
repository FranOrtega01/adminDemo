import dotenv from 'dotenv'
dotenv.config()

export default {
    persistence: process.env.PERSISTENCE,

    mongoURI: process.env.MONGO_URI,
    mongoDBName: process.env.MONGO_DB_NAME,

    adminUser: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASSWORD,

    gmailAppKey: process.env.GMAIL_APP_KEY,
    gmailAppEmail: process.env.GMAIL_EMAIL,

    jwtSign: process.env.JWT_SIGN,
    jwtCookie: process.env.JWT_COOKIE,
    
    sessionSign: process.env.SESSION_SIGN,

    frontURL: process.env.FRONT_URL,

    reCaptchaKey: process.env.RECAPTCHA_KEY,

    port: process.env.PORT,
}