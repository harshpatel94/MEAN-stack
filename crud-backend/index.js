//importing modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var logger = require('mean-logger');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config');
var app = express();
const route = require('./route/routes');

//connect mongodb
mongoose.connect('mongodb://localhost:27017/dealer');

//on connection
mongoose.connection.on('connected', ()=>{
  console.log('Mongodb connected.');
});


//Error
mongoose.connection.on('error', (err)=>{
  console.log(err);
});

const PORT = 3000;

//adding miidleware
app.use(cors());

//body bodyparser
app.use(bodyparser.json());

app.use('/api', route);


app.get('/',(req,res)=>{
  res.send('some changes');
})

app.listen(PORT, ()=>{
  console.log('Server connected on port:' + PORT);
});

// //logging initialization
// logger.init(app, mongoose);

exports = module.exports = app;
