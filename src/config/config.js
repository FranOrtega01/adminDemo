import dotenv from 'dotenv'
dotenv.config()

export default {
    persistence: process.env.PERSISTENCE,

    mongoURI: process.env.MONGO_URI,
    mongoDBName: process.env.MONGO_DB_NAME,

    adminUser: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASSWORD
}