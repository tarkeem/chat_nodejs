var express = require('express');
var router = express.Router();
const user = require('../moduls/user').User
const chat = require('../moduls/chat').getchat
const message = require('../moduls/message').message
const multer = require('multer')
const jsw = require('jsonwebtoken')
/* GET users listing. */









const webKey = 'this is key'

exports.signup = function (req, res, next) {
    let token = jsw.sign({
        'name': req.body.name
    }, webKey, {
        expiresIn: '2d'
    })

    let newUser = user({
        userName: req.body.name,
        image: req.file.filename,
        password: req.body.pass

    })
    newUser.save().then(result => {
        console.log(result);
        res.status(200).json({
            'token': token,
            'id': result._id,
            'image': result.image,
            'name': result.userName

        })
    }).catch(err => {
        res.json(400)
    })
}



exports.signin =function (req, res, next){

 

    user.findOne({
        userName: req.body.name,
    }).then((doc) => {
        if (!doc) {
          
            res.status(404).json({
                message: 'not found'
            })
        } else {
            if (doc.password == req.body.pass) {
                let token = jsw.sign({
                    'name': req.body.name
                }, webKey, {
                    expiresIn: '2d'
                })
                res.status(200).json(
                    {
                        'token': token,
                        'id': doc._id,
                        'image': doc.image,
                        'name': doc.userName
                    }
                )
            }
            else
            {
                res.status(400).json(
                    {
                        'message':"wrong password"
                    }
                )
            }

        }
    }).catch(err=>{
        res.status(200).json({
            "message":"error happen"
        })
    });

}










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
