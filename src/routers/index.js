const users  = require('./users')
const posts  = require('./post')
function route(app){
    app.use('/users', users)
    app.use('/post', posts)
    
}

module.exports = route;