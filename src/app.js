import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import { Server }  from 'socket.io'
import socket from './run.js';

import dotenv from 'dotenv';
dotenv.config();


// Init Servers
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Config engine templates
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Set config
app.use(express.json())
app.use(express.static(__dirname + '/public'))

//Socket + Routes
const httpServer = app.listen(8080, () => console.log('Listening...'))
const socketServer = new Server(httpServer)
socket(socketServer, app)

