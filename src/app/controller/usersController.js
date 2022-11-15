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
    usersModel
      .findUsersById(req.query.id)
      .then(function (data) {
        var result = Object.entries(data[0]);
        console.log(result);
        res.render("users/view", { data: result, ctl: "user" });
        // console.log(data)
      })
      .catch((err) =>
        setImmediate(() => {
          return err;
        })
      );
  }
  async delete(req, res) {
    let del;
    await usersModel.findUsersById(req.query.id).then(function(data){
      del=data[0].photo;
      console.log(del);
    });
    await usersModel
      .delUsersById(req.query.id)
      .then(function (data) {
        if(del != 'no-avatar.png'){
          fs.unlink('src/public/upload/users/'+del, (err) => {
            if (err) {
              console.error(err)
              return
            }
          });
        }
        res.end(JSON.stringify(data));
      })
      .catch((err) =>
        setImmediate(() => {
          return err;
        })
      );
  }
  edit(req, res) {
    usersModel
      .findUsersById(req.query.id)
      .then(function (data) {
        console.log(data[0]);
        res.render("users/form", { data: data[0], act: "update", ctl: "user", id: req.query.id});
      })
      .catch((err) =>
        setImmediate(() => {
          return err;
        })
      );
  }
  add(req, res) {
    res.render("users/form", { act: "add", ctl: "user" });
  }
  update(req, res) {
    delete req.body.btn_submit;
    const file = req.file;
    if(file){
      let del;
      req.body.photo=file.filename;
      usersModel.findUsersById(req.query.id).then(function(data){
        del=data[0].photo;
        fs.unlink('src/public/upload/users/'+del, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
    }
    // usersModel.addUsers(req.body);
    usersModel.updateUsers(req.query.id,req.body);
    res.send("dasdasd");
  }
  store(req, res) {
    
    // const file = req.file;
    // console.log(req.files);
    // console.log(req.body);
    const file = req.file;
    console.log(req.body);
    req.body.photo = file ? file.filename : "no-avatar.png";
    usersModel.addUsers(req.body);
    res.redirect(`/users`);
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
