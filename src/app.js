import express from 'express';
import session from 'express-session';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import socket from './run.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js'

import config from './config/config.js';


const PORT = config.port || 8080;

// Init Servers
const app = express()

app.use(cookieParser())

app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

const corsOptions = {
    origin: ['https://instrumentaldufour.net', 'https://www.instrumentaldufour.net', 'localhost:3000', 'http://127.0.0.1:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
};

app.use(cors(corsOptions));

// Config Session
app.use(session({
    secret: config.sessionSign,
    resave: false,
    saveUninitialized: true,
}));

// Passport Middlewares Config
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


const httpServer = app.listen(PORT, () => console.log('Listening...'))
const socketServer = new Server(httpServer)
socket(socketServer, app)

