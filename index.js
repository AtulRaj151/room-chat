const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/mongoose');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors())
app.use(logger('dev'));
app.use(express.json()) 
app.use(express.urlencoded({ extended: false}));

// use routes here
app.use('/',require('./routes'))
app.listen(port,(err)=> {
      if(err) { console.log("err in server",err); return;}
      console.log("connected to server");
})