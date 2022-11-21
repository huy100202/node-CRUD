const mysql = require('mysql2');
const mongoose = require("mongoose");
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Haianhem123@",
  database: 'node-crud'
});
 async function connectDB() {
  try {
    mongoose.connect("mongodb://localhost:27017/CRUD", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB")
  } catch (err) {
    console.log(err);
  }
}
// simple query


module.exports = {connection,connectDB };
// with placeholder
