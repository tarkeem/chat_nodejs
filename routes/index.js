var express = require('express');
var router = express.Router();
const chatdbdb=require('../moduls/chat');
const userdb = require('../moduls/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
