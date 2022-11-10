const usersRouter = require('./users')
// const siteRouter = require('./site')

function route(app){
    app.use('./users', usersRouter);
    // app.use('./site', siteRouter);
}

module.exports = route;