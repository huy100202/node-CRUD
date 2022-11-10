class UsersController {
    index(req,res) {
        res.render('users')
    }
    view(req,res){
        res.send('dasdasiduasd')
    }
    
}

module.exports = new UsersController;