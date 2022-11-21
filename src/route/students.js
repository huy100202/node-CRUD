const express = require("express");
const router = express.Router();
const upload = require("../app/components/uploadimg");
const saveImg = require("../app/components/saveImg");
const validate = require("../helpers/validate/validate");
const studentController = require("../app/controller/studentsController");
const checkExist = require("../helpers/checkExist/checkExist");
router.use("/edit", studentController.edit);
router.use("/add", studentController.add);
router.use("/update", upload.single("image"), studentController.update);
router.use("/delete", studentController.delete);
router.use("/view", studentController.view);
router.use(
  "/store",
  upload.single("image"),
  validate.student,
  checkExist.checkExistStudent,
  saveImg.saveImg,
  studentController.store
);
router.use("/", studentController.index);

module.exports = router;
