const usersRouter = require('./users');
const siteRouter = require('./site');
const studentsRouter = require('./students');
function route(app){
    app.use('/users', usersRouter);
    app.use('/students', studentsRouter);
    app.use('/', siteRouter);
}

module.exports = route;