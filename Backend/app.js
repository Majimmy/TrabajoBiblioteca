/* poner en backend directamente */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/*var cors = require('cors') activar cuando se conecte con frontend*/ 
var librosRouter = require('./routes/libros');
var app = express();
/**app.use(cors())           activar cuando se conecte con frontend*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/libros', librosRouter);

module.exports = app;
