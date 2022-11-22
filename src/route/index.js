const siteRouter = require('./site');
const studentsRouter = require('./students');
function route(app){
    app.use('/students', studentsRouter);
    app.use('/', siteRouter);
}
module.exports = route;