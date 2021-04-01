const express = require('express')
const router = express.Router();

// Importer les controllers

const articleController = require('./controllers/articleController');
// const countryController = require('./controllers/countryController');
// const associationController = require('./controller/associationController');



// Récupérer tous les articles
router.get('/articles', articleController.findAll);

// Récupérer un article 
router.get('/articles/:id', articleController.findOne);


// Récupérer tout les pays 
// router.get('/countries', countryController.findAll);

// Récupérer tout les articles d'un pays 
// router.get('/countries/:countryId/articles')


// Ajouter un article en tant que admin 

module.exports = router; 