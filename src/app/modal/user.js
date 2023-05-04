const mongoose = require('mongoose')
const schema = mongoose.Schema

const user = new schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    backgorund: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('user',user)
