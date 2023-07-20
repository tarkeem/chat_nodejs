const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require("http");
const socketio = require("socket.io");
const app = express();
const chatSocket=require('./socket/chatSocket').chatSocket
const mongodb=require('mongoose')
 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors=require('cors');
// Create the http server
const server = require('http').createServer(app);



mongodb.connect('mongodb://localhost/chatdb',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,}).then(()=>{
    console.log('connected to db');
  }).catch((err)=>{
    console.log('error happen.................................')
    console.log(err);
  });


// Create the Socket IO server on
// the top of http server
const io = socketio(server);
 
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('userimages'));
 





chatSocket(io);





app.use('/', indexRouter);
app.use('/user', usersRouter);
 
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
 
// Error handler
app.use(function (err, req, res, next) {
 
    // Set locals, only providing error
    // in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env')
        === 'development' ? err : {};
 
    // render the error page
    res.status(err.status || 500);
    console.log(err)
    res.render('error');
});
 
module.exports = { app: app, server: server };