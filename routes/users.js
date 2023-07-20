var express = require('express');
var router = express.Router();
const user = require('../moduls/user').User
const chat = require('../moduls/chat').getchat
const message = require('../moduls/message').message
const multer = require('multer')
const jsw = require('jsonwebtoken')
const authCtr=require('../controller/authCtr')
const chatCtr=require('../controller/chatCtr')
/* GET users listing. */



var storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, './userimages')//create empty folder first

    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  }
);
var upload = multer(
  {
    storage: storage,
    limits: { fieldSize: 5 * 1024 * 1024 }
  }
)






const webKey = 'this is key'

router.post('/signup', upload.single("signup"),authCtr.signup);



router.post('/signin', authCtr.signin);



router.post('/getchat', chatCtr.getchat
)


router.post('/getchatmessage', chatCtr.getchatmessage
)






/*router.get('/test',(req,res,next)=>{

 
 
  try {
      let token=req.headers.authorization
  tokendata= jsw.verify(token,webKey)

  res.status(200).json({
    message:tokendata
  })
  } catch (error) {
    res.status(200)
  }
 
}
)*/











module.exports = router;
