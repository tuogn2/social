const users = require('../modal/user')
const posts =require('../modal/post')

class authmidlerware{
    checkUser(req,res,next){
        if(!req.signedCookies.user){
            res.status(401).json({masage:"chua login"})
            return;
        }

        users.find({email:req.signedCookies.user})
        .then((user)=>{
            if(!user){
                res.status(404).json({masage:"cookies khong hop le"})
                return;
            }
            
            next();
        })

        .catch(err=>  res.status(500).json(err))
    }

    checkdeletepost(req,res,next){
        posts.findById(req.body.postId)
        .then(post=>{
            // res.json(post)
            if(!post){
                res.status(404).json({masage:"khong ton tai post nay"})
                return;
            }
 
            if(req.body.userid == post.user){
                next();
            }else{
                res.status(400).json({masage:"khong co quyen xoa"})
                return;
            }
        })
        .catch(err=>  res.status(500).json(err))
    }
}

module.exports = new authmidlerware;