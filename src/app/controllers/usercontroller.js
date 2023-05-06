const user = require('../modal/user');
const users = require('../modal/user')
const bcrypt = require('bcrypt');



class usercontroller {

    //[get]/user/myuser/:id
    getmyuser(req, res, next) {
        users.findById(req.params.id)
            .then(myuser => {
                return res.status(200).json(myuser)
            })
            .catch(err => res.status(500).json(err))
    }
    //[get]/user/deletecookie
    deletecookie(req, res, next) {
        res.clearCookie('user');
        res.status(200).json({ masage: 'done' })
    }
    //[get]/users/getuser?q=...  |lấy ra các acc theo tu khoa
    getuser(req, res, next) {
        // var epretion = `/${req.query.q}/`
        // users.find({name:{$regex:epretion}})
        // .then(user=>res.status(200).json(user))
        // .catch(err=>res.status(500).json(err))

        const query = req.query.q;
        const regex = new RegExp(query, 'i');

        users.find({ name: { $regex: regex } })
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    }


    //[patch]/users/addavatar/:id
    addavatar(req, res, next) {

        req.body.avatar = req.file.path.split('\\').slice(2).join('/');

        users.findByIdAndUpdate(req.params.id, { avatar: req.body.avatar }, { new: true })
            .then(user => res.status(200).json(user))
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    //[patch]/users/addavatar/:id
    background(req, res, next) {
        req.body.background = req.file.path.split('\\').slice(2).join('/');
        //name = background
        users.findByIdAndUpdate(req.params.id, { backgorund: req.body.background }, { new: true })
            .then(user => res.status(200).json(user))
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    //[get]/users
    showusers(req, res, next) {
        users.find()
            .then(user => {

                return res.status(200).json(user)
            })
            .catch(next)
    }
    //[post]/users
    createuser(req, res, next) {
        const newuser = req.body

        users.find({ email: req.body.email })
            .then(userlt => {
                if (userlt.length === 0) {
                    bcrypt.genSalt(10)//tạo mã
                        .then(salt => bcrypt.hash(req.body.password, salt))  // tạo ra mã code random
                        .then(hashedPassword => {
                            req.body.password = hashedPassword
                            const user = new users(newuser);
                            user.save()
                                .then(user => {
                                    res.cookie('user', req.body.email, {
                                        signed: true,
                                        sameSite: 'none',
                                        httpOnly:true,
                                        secure:true
                                    })
                                    res.status(200).json(user)
                                })
                                .catch(next)
                        })
                } else {
                    res.status(400).json('đã tạo rồi')
                }
            })
            .catch(err => res.status(500).json(err))

    }




    //[post]login
    loginuser(req, res, next) {
        users.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    res.status(401).json("wrong credentials");
                    return;
                }
                bcrypt.compare(req.body.password, user.password)
                    .then((validated) => {
                        if (!validated) {
                            res.status(403).json("wrong credentials");
                            return;
                        }
                        res.cookie('user', req.body.email, {
                            signed: true,
                            sameSite: 'none',
                            httpOnly:true,
                            
                        })
                        const { password, ...orthers } = user._doc
                        res.status(200).json(orthers);
                    })
                    .catch((err) => {
                        res.status(500).json(err)
                    });
            })
    }


    //luồng nếu mà trong friends có cái id đó rồi thì gọi hàm xóa nếu chưa thì gọi hàm thêm
    //[patch]/users/:id
    addfriend(req, res, next) {
        users.findByIdAndUpdate({ _id: req.body.id }, {
            $addToSet: { friends: req.params.id }
        }, { new: true })
            .then(user => {
                res.status(200).json(user)

            })
            .catch(err => {
                return res.status(500).json({ error: 'Failed to add friend' });
            })
    }
    //[patch]/users/removefriend/:id
    removefriend(req, res, next) {
        users.findByIdAndUpdate({ _id: req.body.id }, {
            $pull: { friends: req.params.id }
        }, { new: true })
            .then(user => {
                res.status(200).json(user)

            })
            .catch(err => {
                return res.status(500).json({ error: 'Failed to remove friend' });
            })
    }



}


module.exports = new usercontroller;
