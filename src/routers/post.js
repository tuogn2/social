const express = require('express')
const postcontroller = require('../app/controllers/postcontroller')
const route = express.Router()


const multer = require('multer') 
const upload = multer({ dest: './src/public/img/posts'})

const authmidlerware =require('../app/midlerware/authmidlerware.js')


route.get('/:id',postcontroller.getpost)
route.post('/comment',authmidlerware.checkUser,postcontroller.comment)
route.delete('/deletepost',authmidlerware.checkUser,authmidlerware.checkdeletepost,postcontroller.deletecomment)
route.post('/like',authmidlerware.checkUser,postcontroller.like)
route.post('/dislike',authmidlerware.checkUser,postcontroller.dislike)

route.get('/',postcontroller.getposts) 

route.post('/',authmidlerware.checkUser,upload.single('pictureposts'),postcontroller.createpost)





module.exports = route