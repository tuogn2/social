const express = require('express')
const path =require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine

const cookieParser = require('cookie-parser')
const app = express() 
const port = 4000
const route = require('./routers/index.js')
const db = require('./config/db')


var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname,'public')))

app.use(cookieParser('dsadassfsdf'))

db.connect(); 
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())

app.use(morgan('combined')) // phai de truoc router

app.engine('hbs', handlebars({
  extname:'.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',  path.join(__dirname, 'resources\\views'));

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', ['https://main--zingy-pixie-868efb.netlify.app/#/login','http://localhost:3000']);
//   // res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
 
//   // Pass to next layer of middleware
//   next();
// });

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Allow-Origin','https://main--zingy-pixie-868efb.netlify.app');
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});




// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin',['https://main--zingy-pixie-868efb.netlify.app','http://localhost:3000'] );
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   // Pass to next layer of middleware
//   next();
// }); 

//routing
route(app);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})