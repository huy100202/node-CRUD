const fs = require("fs");

function saveImg(req, res, next) {
  if (req.file) {
    const file = req.file;
    const oldPath = req.file.path;
    const newPath = "src/public/upload/" + req.body.ctl + "s/" + file.filename;
    console.log(newPath);
    fs.rename(oldPath, newPath, function (err) {
      if (err) console.log(err);
      console.log("Successfully renamed - AKA moved!");
    });
    next();
  } else {
    next();
  }
}

module.exports = { saveImg };
