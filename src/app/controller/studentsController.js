const studentsModel = require("../models/students");
const { mongooseToObject, delImg } = require("../../util/mongoose");

class studentsController {
  async index(req, res) {
    try {
      const all = await studentsModel.find({});
      res.render("students/", { data: all, ctl: "students" });
    } catch (err) {
      res.render("students/", { data: null, ctl: "students" });
    }
  }
  async view(req, res) {
    try {
      const view = await studentsModel.find({ _id: req.query.id });
      const data = mongooseToObject(view[0]);
      res.render("students/view", { data: data, ctl: "students" });
    } catch (err) {
      res.json(err);
    }
  }
  async delete(req, res) {
    try {
      const del = await studentsModel.findByIdAndRemove(
        req.query.id,
        function (err, docs) {
          if (docs.profilePic != "no-avatar.png") {
            delImg("students", docs.profilePic);
          }
        }
      );
      res.write(response);
    } catch (err) {
      setImmediate(() => {
        return err;
      });
      res.json(err);
    }
  }
  async edit(req, res) {
    try {
      const view = await studentsModel.find({ _id: req.query.id });
      const data = mongooseToObject(view[0]);
      res.render("students/form", {
        data: data,
        act: "update",
        ctl: "students",
        id: req.query.id,
      });
    } catch (err) {
      setImmediate(() => {
        return err;
      });
    }
  }
  add(req, res) {
    res.render("students/form", {
      act: "add",
      ctl: "students",
      err: req.query.err,
    });
  }
  async update(req, res) {
    try {
      const file = req.file;
      var update = {
        full_name: req.body.full_name,
        phone: req.body.phone,
        address: req.body.address,
        class: req.body.class,
      };
      if (file) {
        update.profilePic = file.filename;
      }
      await studentsModel.findOneAndUpdate(
        { _id: req.query.id },
        update,
        { upsert: true },
        function (error, doc) {
          if (doc.profilePic != "no-avatar.png" && file) {
            delImg("students", doc.profilePic);
          }
        }
      );
      res.redirect(`/students`);
    } catch (err) {
      setImmediate(() => {
        return err;
      });
    }
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
