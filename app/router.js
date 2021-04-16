const express = require('express')
const router = express.Router();

// Importer les controllers

const articleController = require('./controllers/articleController');
const countryController = require('./controllers/countryController');
const adminController = require('./controllers/adminController');
const mainController = require('./controllers/mainController.js');

// Afficher la page d'accueil 
router.get('/', mainController.showHomePage);


// Récupérer tous les articles
router.get('/articles', articleController.findAll);

// Récupérer un article 
router.get('/articles/:id', articleController.findOne);

// Supprimer un article
router.get('/articles/delete/:id', adminController.delete);


// Récupérer tout les pays sans les articles
router.get('/countries', countryController.findAll);

// Récupérer tout les articles d'un pays 
router.get('/countries/:countryId/articles', countryController.findOne);

// Afficher la page le formulaire de connexion
router.get('/login',  adminController.showLoginForm);

// On traite les données du formulaire de connexion
router.post('/login', adminController.loginPost);

// Afficher la page de l'administrateur
router.get('/admin', adminController.showAdmin);

// Afficher la page pour ajouter un article 
router.get('/admin/add', adminController.showAddArticleForm);

// Traiter les données pour ajouter un article
router.post('/admin/add', adminController.add);

// Afficher la page pour supprimer un article 
router.get('/admin/delete', adminController.showDelete);




module.exports = router; 