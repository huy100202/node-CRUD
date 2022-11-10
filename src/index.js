const express = require('express');
const configViewEngine  = require('./configs/viewEngine');
// const connect= require('./configs/connectDB')
const web = require('./route/web');

const app = express();
const port = 3000;
configViewEngine(app);

web(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})