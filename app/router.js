const express = require('express')
const router = express.Router();

// Importer les controllers
const articleController = require('./controllers/articleController');
const countryController = require('./controllers/countryController');
const adminController = require('./controllers/adminController');
const mainController = require('./controllers/mainController.js');

// HOMEPAGE //
router.get('/', mainController.showHomePage);

// ARTICLES //
router.get('/articles', articleController.findAll); // Récupérer tous les articles
router.get('/articles/:id', articleController.findOne); // Récupérer un article 


// COUNTRIES //
router.get('/countries', countryController.findAll);// Récupérer tout les pays sans les articles
router.get('/countries/:countryId/articles', countryController.findOne); // Récupérer tout les articles d'un pays 

// LOGIN // 
router.get('/login',  adminController.showLoginForm); // Afficher la page le formulaire de connexion
router.post('/login', adminController.loginPost); // On traite les données du formulaire de connexion

// ADMIN //
router.get('/admin', adminController.showAdmin); // Afficher la page de l'administrateur

// ADD //
router.get('/admin/add', adminController.showAddArticleForm); // Afficher la page pour ajouter un article 
router.post('/admin/add', adminController.add); // Traiter les données pour ajouter un article

// DELETE //
router.get('/admin/delete', adminController.showDelete); // Afficher la page pour supprimer un article 
router.get('/articles/delete/:id', adminController.delete); // Supprimer un article

module.exports = router; 