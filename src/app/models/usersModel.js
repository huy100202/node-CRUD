const connect = require("../../configs/connectDB");

class usersModel {
  getAllUsers = function () {
    return new Promise(function (resolve, reject) {
      let query = "SELECT * FROM users";
      connect.connection.query(query, function (err, rows, fields) {
        if (err) {
          return reject(err);
        }
        console.log(rows)
        resolve(rows);
      });
    });
  };
  addUsers = function (newUsers) {
    let arr = Object.entries(newUsers);
    arr.splice(arr.length - 2, 1);
    let col = "";
    let val = "";
    for (let i = 0; i < arr.length; i++) {
      if (i) {
        col += ",";
        val += ",";
      }
      if (arr[i][1] == "") {
        return "err";
      }
      col += arr[i][0];
      val += "'" + arr[i][1] + "'";
    }
    let query =
      "INSERT INTO users (" +
      col +
      ",created,updated) VALUES (" +
      val +
      ",now(),now())";
    return new Promise(function (resolve, reject) {
      connect.query(query, function (err, rows, fields) {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  findUsersById = function (usersId) {
    return new Promise(function (resolve, reject) {
      connect.query(
        "SELECT * FROM users WHERE id =" + usersId,
        function (err, rows) {
          if (err) {
            return reject(err);
          }
          resolve(rows);
        }
      );
    });
  };
  delUsersById = function (usersId) {
    return new Promise(function (resolve, reject) {
      connect.query(
        "DELETE FROM users WHERE id =" + usersId,
        function (err, rows) {
          if (err) {
            return reject(err);
          }
          resolve(rows);
        }
      );
    });
  };
  updateUsers = function (usersId, usersData) {
    let arr = Object.entries(usersData);
    let update = 'updated=now()';
    for (let i = 0; i < arr.length; i++) {
      update += ","+ arr[i][0] + "=" + "'" + arr[i][1] + "'";
    }
    return new Promise(function (resolve, reject) {
      connect.query(
        "UPDATE users SET " + update + " WHERE id=" + usersId,
        function (err, rows) {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  };
}

module.exports = new usersModel();
