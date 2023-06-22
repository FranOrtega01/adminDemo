import multer from 'multer'
import fs from 'fs'
import __dirname from '../utils.js'

const storage = multer.memoryStorage();

export const upload = multer({ storage });