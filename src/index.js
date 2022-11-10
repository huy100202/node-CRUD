const express = require('express');
const configViewEngine  = require('./configs/viewEngine');
const connect= require('./configs/connectDB')
const route = require('./route');
connect.connection;
const app = express();
const port = 3000;
configViewEngine(app);
// app.get('/users', (req,res) => {
//   return res.render('users')
// });
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})