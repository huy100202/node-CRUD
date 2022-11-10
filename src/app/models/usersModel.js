const connect = require("../../configs/connectDB");

class usersModel {
  getAllUsers = function (result) {
    let query = "SELECT * FROM users";
  
    connect.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
    //   console.log("tutorials: ", res);
      result(null, res);
    });
  };
  insertUsers = function (newUsers, result) {
    connect.query("INSERT INTO users SET ?", newUsers, function (err, res) {
      if (err) {
        return result(err, null);
      } else {
        return result(null, res);
      }
    });
  };
  findUsersById = function (usersId, result) {
    connect.query(
      "SELECT * FROM users WHERE id =" + usersId,
      function (err, rows) {
        if (err) throw err;

        if (rows.length <= 0) {
          return result(err);
        } else {
          return result(rows);
        }
      }
    );
  };

  updateUsers = function (usersId, users, result) {
    connect.query(
      "UPDATE users SET  ? WHERE id=" + usersId,
      users,
      function (err, rows) {
        if (err) result(err);

        return result(rows);
      }
    );
  };
}

module.exports = new usersModel();
