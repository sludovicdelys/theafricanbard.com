const { response } = require('express');
const database = require('../database');

module.exports = {
    showHomePage: (request, response) => {
        response.render('index');
    },

 

}