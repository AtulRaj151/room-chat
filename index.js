const express = require('express');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io')(server);
const webSockets = require('./utils/WebSockets')
require('dotenv').config();
const db = require('./config/mongoose');


const port = process.env.PORT || 3000;

app.use(cors())
app.use(logger('dev'));
app.use(express.json()) 
app.use(express.urlencoded({ extended: false}));


// use routes here
app.use('/',require('./routes'))

//create socket connection

global.io = socketio.listen(server);
global.io.on('connection', webSockets.connection);
server.listen(port);
server.on('listening',()=>{
    console.log(`Listening on port:: http://localhost:${port}/`)
});