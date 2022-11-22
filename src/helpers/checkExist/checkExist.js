const student = require("../../app/models/students");

async function checkExistStudent(req, res, next) {
  console.log(req.body.phone);
  try {
    const check = await student.find({ phone: req.body.phone });
    if (check[0].id == req.query.id) {
      next();
    } else {
      res.redirect(`/students/add?err=phone number already exists`);
    }
  } catch (err) {
    next();
  }
}
module.exports = { checkExistStudent };
