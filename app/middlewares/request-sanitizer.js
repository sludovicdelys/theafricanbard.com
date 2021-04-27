const { request, response } = require("express");
const { noExtendLeft } = require("sequelize/types/lib/operators");

const sanitizer = require('sanitizer');

// Pour chaque propriété de l'object, on va modifier la valeur stockée avec sanitizer
// Protéger des éventuelles injections
const sanitize = object => {
    for (const property in object) {
        object[property] = sanitize.escape(object[property]);
    }
}

const middleware = (request, response, next) => {

    sanitize(request.params);
    sanitize(request.query);
    sanitize(request.body);

    next();
}