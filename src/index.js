const express = require('express');
const configViewEngine  = require('./configs/viewEngine');
var bodyParser = require('body-parser');
const connect= require('./configs/connectDB')
const route = require('./route');
var path = require("path");
connect.connection;
connect.connectDB();
const app = express();
const port = 3000;
configViewEngine(app);
// app.get('/users', (req,res) => {
//   return res.render('users')
// });
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
route(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
