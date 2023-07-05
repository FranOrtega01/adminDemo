import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
// import { Server } from 'socket.io';
// import socket from './run.js';
import cors from 'cors';
import bodyParser from 'body-parser';

import adminViewRouter from './routes/adminView.router.js'
import adminRouter from './routes/admin.router.js'
import preServiceRouter from './routes/preService.router.js'
import homeRouter from './routes/home.router.js'
import config from './config/config.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = config.port || 8080;


// Init Servers
const app = express()
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

// Config CORS
app.use(cors())

// Config engine templates
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Set config
app.use(express.json())
app.use(express.static(__dirname + '/public'))

//Socket + Routes

app.use('/', homeRouter)
app.use('/admin', adminViewRouter)
app.use('/api/admin', adminRouter)
app.use('/preservice', preServiceRouter)


app.listen(PORT, () => console.log('Listening...'))

// const httpServer = app.listen(8080, () => console.log('Listening...'))
// const socketServer = new Server(httpServer)
// socket(socketServer, app)

