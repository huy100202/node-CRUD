const student = require("../../app/models/students");

async function checkExistStudent(req, res, next) {
  console.log(req.body.phone);
  try {
    const check = await student.find({ phone: req.body.phone });
    console.log(check[0].full_name);
    res.render('/students');
  } catch (err) {
    
    next();
  }
}
module.exports = { checkExistStudent };
