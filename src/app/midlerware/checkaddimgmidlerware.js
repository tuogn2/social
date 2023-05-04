const users = require('../modal/user')

class checkaddimgmidlerware {
    checkimg(req, res, next) {

        users.findById(req.params.id)
            .then((user) => {
                if (user.email == req.signedCookies.user) {
                    return next();
                }
                return res.status(400).json({ mesage: "khong load anh duoc" })
            })
            .catch(err => {
                return res.status(500).json(err)
            })

    }
    // if(!req.signedCookies.user){
    //     res.status(401).json({masage:"chua login"})
    //     return;
    // }


    //     next();
    // })

    // .catch(err=>  res.status(500).json(err))
}

module.exports = new checkaddimgmidlerware;