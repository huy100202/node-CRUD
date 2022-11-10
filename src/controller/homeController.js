const connect= require('../configs/connectDB')
let getHomepage = (req,res) => {
    let data=[];
    //  connect.query(
    //     'SELECT * FROM `users`',
    //     function(err, results, fields) {
    //       console.log(results);
    //       data=results;
    //       console.log(JSON.stringify(data));
    //       // results contains rows returned by server// fields contains extra meta data about results, if available
    //       callback(()=>res.render('index.ejs',{data: JSON.stringify(data)}));
    //     }
    //   );
    // return res.render('index.ejs',{data: JSON.stringify(data)});
    var query = connect.query('SELECT * FROM users');
    query.on('result', function (row) {
        return res.render('index.ejs',{data: JSON.stringify(data)});
    });
}

module.exports = {
    getHomepage
}