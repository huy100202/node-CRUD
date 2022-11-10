class SitesController {
  index(req,res) {
      res.render('site/')
  }
  view(req,res){
      res.render('homePage')
  }
  
}

module.exports = new SitesController;