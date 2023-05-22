import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


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