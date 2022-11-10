const usersModel= require('../models/usersModel');
class UsersController {
    index(req,res) {
        // usersModel.getAllUsers(function(err,users){
        //     if(err){
        //             throw err;
        //     }else{
        //         res.render('users/',{title:'Users Listing',users:users});
        //     }
           
        // });
        // let a= usersModel.getAllUsers();
        // a.catch(console.log(a))
        // // console.log(usersModel.getAllUsers())
        // a.catch(res.render('users/',{a:a}));
        usersModel.getAllUsers((err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            else{
                res.render('users/',{data:JSON.stringify(data)});
            } ;
          });
    }
    view(req,res){
        res.send('dasdasiduasd');
    }
    delete(req,res){
        res.send('dasdasiduasd');
    }
    edit(req,res){
        res.send('dasdasiduasd');
    }
    add(req,res){
        res.send('dasdasiduasd');
    }
    
}

module.exports = new UsersController;