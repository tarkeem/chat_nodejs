
var express = require('express');
var router = express.Router();
const user = require('../moduls/user').User
const chat = require('../moduls/chat').getchat
const message = require('../moduls/message').message
const multer = require('multer')
const jsw = require('jsonwebtoken')
/* GET users listing. */






exports.getchat= (req, res, next) => {

    let data = {
        first: req.body.f,
        second: req.body.s
    }

    let chatId = chat(data)
    chatId.then(da => {

        res.status(200).json({
            'message': da._id
        })
    })


}



exports.getchatmessage= (req, res, next) => {

    message.find({
        chatId: req.body.id
    }).then(data => {
        res.status(200).json({
            message: data
        })
    });


}
