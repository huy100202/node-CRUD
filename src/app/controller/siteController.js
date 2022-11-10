class SitesController {
  index(req,res) {
      res.render('sites')
  }
  view(req,res){
      res.render('homePage')
  }
  
}

module.exports = new SitesController;