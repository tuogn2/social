const users = require('../modal/user')
const posts = require('../modal/post')
const bcrypt = require('bcrypt');

class postcontroller {
    //[get]/post
    getposts(req, res, next) {
        posts.find()
            .then(post => {
                return res.status(200).json(post)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }


    //[post]/post
    //sẽ cho một cái req.body.user là mặc định ẩn bên form
    // createpost(req, res, next) {
    //     var postpiture = req.files
    //     var arrpath = postpiture.map((post) => {
    //         return post.path.split('\\').slice(2).join('/');
    //     })
    //     req.body.image = arrpath
    //     const newpost = new posts(req.body)

    //     newpost.save()
    //         .then(post => (
    //             res.status(200).json(post)
    //         ))
    //         .catch(err => (
    //             res.status(500).json(err)
    //         ))
    // }


    createpost(req, res, next) {
        if(req.file){
            var postpiture = req.file.path.split('\\').slice(2).join('/');
        }
        // var arrpath = postpiture.map((post) => {
        //     return post.path.split('\\').slice(2).join('/');
        // })
        if(postpiture){

            req.body.image = postpiture
        }
        const newpost = new posts(req.body)

        newpost.save()
            .then(post => (
                res.status(200).json(post)
            ))
            .catch(err => (
                res.status(500).json(err)
            ))
    }
    //[get]/post/:id  // lay ra if cu the cua 1 nguowi
    getpost(req, res, next) {
        posts.find({ user: req.params.id })
            .then(posts => res.status(200).json(posts))
            .catch(err => res.status(500).json(err))
    }

    //[post]/post/comment
    comment(req, res, next) {
        var comment = {
            user: req.body.comment.userId,
            text: req.body.comment.text,
        }
        posts.findByIdAndUpdate({ _id: req.body.id }, { $push: { comment: comment } }, { new: true })
            .then(post => res.status(200).json(post))
            .catch(err => res.status(500).json(err))
    }

    //[delete]/post/deletecomment
    deletecomment(req, res, next) {
        try {
            posts.findByIdAndDelete(req.body.postId)
                .then(post => res.status(200).json(post))
                .catch(err => res.status(500).json(err))
        } catch (error ) {
                res.status(500).json(error)
        }
    }

    //[get]/post/like

    // ý tưởng 
    like(req, res, next) {
        // res.json(req.body)
        posts.findByIdAndUpdate({ _id: req.body.id }, { $addToSet: { likecount: req.body.userId } }, { new: true })
            .then(post => {
                return res.status(200).json(post)
            })
            .catch(err => res.status(500).json(err))
    }


    //[post]/post/dislike
    dislike(req, res, next) {
        posts.findByIdAndUpdate({ _id: req.body.id }, { $pull: { likecount: req.body.userId } }, { new: true })
            .then(post => {
                return res.status(200).json(post)
            })
            .catch(err => res.status(500).json(err))
    }
}


module.exports = new postcontroller;