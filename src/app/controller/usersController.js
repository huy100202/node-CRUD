const usersModel = require("../models/usersModel");

const fs = require("fs");
// var url = require("url");
// var path = require("path");
// var parsed = url.parse("http://example.com:8080/test/users?attr=100");
// console.log(path.basename(parsed.pathname));
class UsersController {
  index(req, res) {
    usersModel
      .getAllUsers()
      .then(function (data) {
        res.render("users/", { data: data, ctl: "user" });
      })
      .catch((err) =>
        setImmediate(() => {
          return err;
        })
      );
  }
  view(req, res) {
    res.send("dasdasiduasd");
  }
  delete(req, res) {
    res.send("dasdasiduasd");
  }
  edit(req, res) {
    res.send("dasdasiduasd");
  }
  add(req, res) {
    res.render("users/form", { act: "add" });
  }
  store(req, res) {
    // const file = req.file;
    // console.log(req.files);
    // console.log(req.body);
    const file = req.file;
    console.log(file.mimetype);
    req.body.photo=file?file.filename:'no-avatar.png';
    console.log(req.body);
    console.log(usersModel.addUsers(req.body))
    res.redirect(`/users`)
    }
//  form.parse(req, function (err, fields, files) {
//     var oldpath = files.filetoupload.filepath;
//     var newpath = 'C:/Users/Your Name/' + files.filetoupload.originalFilename;
//     fs.rename(oldpath, newpath, function (err) {
//       if (err) throw err;
//       res.write('File uploaded and moved!');
//       res.end();
//     });
// });
    // if(usersModel.addUsers(req.body) == 'err'){
    //     res.render('users/form',{act:'add'});
    // }else{
    //     res.redirect(`/users`);
    // }
    
    // console.log(Object.entries(req.body).length);
  
}

module.exports = new UsersController();
