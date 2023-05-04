const mongoose = require('mongoose')
const schema = mongoose.Schema

const post = new schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    image: [{ type: String }],
    likecount: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comment: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: true },
            created_at: { type: Date, default: Date.now }

        }
    ],//mang document chứa id của users và phần cmt của user đó
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('post', post)
