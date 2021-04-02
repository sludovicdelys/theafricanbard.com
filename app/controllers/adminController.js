const { response } = require('express');
const database = require('../database');

module.exports = {
    showLoginForm: (request, response) => {
        response.render('login');
    }

};