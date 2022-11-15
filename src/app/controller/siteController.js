class SitesController {
  index(req,res) {
      res.render('site/',{ctl: 'site'})
  }
  view(req,res){
      res.render('homePage')
  }
  
}

module.exports = new SitesController;