const fs = require("fs");

module.exports = {
    multiMongooseToObject: function (mongooses){
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: function (mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    },
    delImg: function(ctl,img){
        fs.unlink(
            "src/public/upload/"+ctl+"/" + img,
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
            }
          );
    }
}