const connect = require("../../configs/connectDB");

class usersModel {
  getAllUsers = function () {
    // let query = "SELECT * FROM users";

    // connect.query(query, (err, res) => {
    //   if (err) {
    //     console.log("error: ", err);
    //     result(null, err);
    //     return;
    //   }

    //   result(null, res);
    // });
    return new Promise(function (resolve, reject) {
      // The Promise constructor should catch any errors thrown on
      // this tick. Alternately, try/catch and reject(err) on catch.

      let query = "SELECT * FROM users";

      connect.query(query, function (err, rows, fields) {
        // Call reject on error states,
        // call resolve with results
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  };
  addUsers = function (newUsers) {
    // let col ='';
    // let val = '';
    // let i=0;
    // let query = entries(newUsers).foreach((item, index) => {
    //   col +=  entries(newUsers)[index][0];
    //   val +=  entries(newUsers)[index][1];
    // })
      let arr = Object.entries(newUsers);
      arr.splice(arr.length-2, 1);
      let col='';
      let val='';
      for (let i = 0; i < arr.length; i++) {
      if(i){
        col += ',';
        val += ',';
      }
      if(arr[i][1] == ''){
        return 'err';
      }
      col += arr[i][0];
      val +=  "'" + arr[i][1] + "'" ;
      }
    let query = 'INSERT INTO users (' + col + ',created,updated) VALUES ('+val + ',now(),now())';
    // let col = Object.keys(newUsers);
    // col.pop();
    // let val = Object.values(newUsers);
    // let query='INSERT INTO users (' + col.toString() + ',created,updated) VALUES ('+val.toString() + ',now(),now())';
    // return query;
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
