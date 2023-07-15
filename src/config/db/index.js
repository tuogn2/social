const mongoose = require('mongoose')
async function connect(){
    const URI ='mongodb+srv://tranphuchituong9d4:01666541095ct@cluster0.yqqmqlo.mongodb.net/?retryWrites=true&w=majority'

try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("seccesfuly")
} catch (error) {
    console.log(error) 
    
}    


}

module.exports = {connect}