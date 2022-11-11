const usersModel= require('../models/usersModel');
var path = require("path");
// var url = require("url");
// var path = require("path");
// var parsed = url.parse("http://example.com:8080/test/users?attr=100");
// console.log(path.basename(parsed.pathname));
class UsersController {
    index(req,res) {
        let path1 = req.originalUrl;
        // let currentFile = 
        console.log(path1)
        usersModel.getAllUsers().then(function(data) {
            res.render('users/',{data:data,ctl:'user'});
        }).catch((err) => setImmediate(() => { throw err; }));
    }
    view(req,res){
        res.send('dasdasiduasd');
    }
    delete(req,res){
        res.send('dasdasiduasd');
    }
    edit(req,res){
        res.send('dasdasiduasd');
    }
    add(req,res){
        
        res.render('users/form',{act:'add'});
    }
    store(req,res){
        res.send(req.body)
    }
}

module.exports = new UsersController;