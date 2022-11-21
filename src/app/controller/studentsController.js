const studentsModel = require("../models/students");

const fs = require("fs");
class studentsController {
  async index(req, res) {
    try {
      const all =await studentsModel.find({});
      res.render("students/", { data: all, ctl: "students" });
    } catch (err) {
      res.render("students/", { data: null, ctl: "students" });
    }
  }
  async view(req, res) {
    try {
      const view = await studentsModel.find({_id:req.query.id});
      const data =JSON.stringify(view[0]);
      res.render("students/view", { data: JSON.parse(data), ctl: "students" });
    } catch (err) {
      res.json(err)
    }
    // studentsModel
    //   .findstudentsById(req.query.id)
    //   .then(function (data) {
    //     var result = Object.entries(data[0]);
    //     res.render("students/view", { data: result, ctl: "student" });
    //   })
    //   .catch((err) =>
    //     setImmediate(() => {
    //       return err;
    //     })
    //   );
  }
  async delete(req, res) {
    let del;
    await studentsModel.findstudentsById(req.query.id).then(function (data) {
      del = data[0].photo;
    });
    await studentsModel
      .delstudentsById(req.query.id)
      .then(function (data) {
        if (del != "no-avatar.png") {
          fs.unlink("src/public/upload/students/" + del, (err) => {
            if (err) {
              console.error(err);
              return;
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
    studentsModel
      .findstudentsById(req.query.id)
      .then(function (data) {
        res.render("students/form", {
          data: data[0],
          act: "update",
          ctl: "student",
          id: req.query.id,
        });
      })
      .catch((err) =>
        setImmediate(() => {
          return err;
        })
      );
  }
  add(req, res) {
    res.render("students/form", { act: "add", ctl: "students" });
  }
  update(req, res) {
    delete req.body.btn_submit;
    const file = req.file;
    if (file) {
      let del;
      req.body.photo = file.filename;
      studentsModel.findstudentsById(req.query.id).then(function (data) {
        del = data[0].photo;
        fs.unlink("src/public/upload/students/" + del, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
    }
    studentsModel.updatestudents(req.query.id, req.body);
    res.redirect(`/students`);
  }
  async store(req, res) {
    try {
      const file = req.file;
      req.body.photo = file ? file.filename : "no-avatar.png";
      const newStudent = new studentsModel({
        full_name: req.body.full_name,
        phone: req.body.phone,
        address: req.body.address,
        class: req.body.class,
        profilePic: req.body.photo,
      });

      const student = await newStudent.save();
      res.redirect(`/students`);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
}

module.exports = new studentsController();
