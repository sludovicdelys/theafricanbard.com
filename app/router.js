const express = require('express')
const router = express.Router();

// Importer les controllers

const articleController = require('./controllers/articleController');
const countryController = require('./controllers/countryController');
const userController = require('./controllers/userController');




// Récupérer tous les articles
router.get('/articles', articleController.findAll);

// Récupérer un article 
router.get('/articles/:id', articleController.findOne);


// Récupérer tout les pays sans les articles
router.get('/countries', countryController.findAll);

// Récupérer tout les articles d'un pays 
router.get('/countries/:countryId/articles', countryController.findOne);

// Afficher le formulaire d'inscription
router.get('/signup', userController.showSignup);

// Traiter les données du formulaire d'inscription
router.post('/signup', userController.doSignup);

module.exports = router; 