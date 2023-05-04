const express = require('express')
const usercontroller = require('../app/controllers/usercontroller')
const route = express.Router()

const authmidlerware = require('../app/midlerware/authmidlerware.js')
const checkaddimgmidlerware = require('../app/midlerware/checkaddimgmidlerware')

const multer = require('multer') 
const upload = multer({ dest: './src/public/img'})
route.get('/getmyuser/:id',usercontroller.getmyuser)

route.patch('/removefriend/:id',authmidlerware.checkUser,usercontroller.removefriend)
route.patch('/addavatar/:id',checkaddimgmidlerware.checkimg,authmidlerware.checkUser,upload.single('avatar'),usercontroller.addavatar)
route.patch('/addback/:id',authmidlerware.checkUser,upload.single('backgorund'),usercontroller.background)
route.get('/deletecookie',usercontroller.deletecookie)
route.patch('/:id',authmidlerware.checkUser,usercontroller.addfriend)
route.post('/login',usercontroller.loginuser)

route.get('/getuser',usercontroller.getuser)

route.get('/',usercontroller.showusers)
route.post('/',usercontroller.createuser)





module.exports = route;