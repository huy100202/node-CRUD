const usersModel = require("../models/usersModel");

const fs = require("fs");
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
        res.render("users/view", { data: result, ctl: "user" });
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
    usersModel.updateUsers(req.query.id,req.body);
    res.redirect(`/users`);
  }
  store(req, res) {
    const file = req.file;
    req.body.photo = file ? file.filename : "no-avatar.png";
    usersModel.addUsers(req.body);
    res.redirect(`/users`);
  }
}

module.exports = new UsersController();
