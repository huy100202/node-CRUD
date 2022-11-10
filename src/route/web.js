const express = require('express');
const homeController = require('../controller/homeController');

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/',homeController.getHomepage)
    return app.use('/',router)
}

module.exports = initWebRoute;