const { response, request } = require('express');
const { Article, Country } = require('../models');
const { Op } = require("sequelize");


module.exports = {
    // Méthode qui affiche la page de connexion
    showLoginForm: (request, response) => {
        response.render('login');
    },



    // Méthode qui vérifie que les bonnes informations de connexion sont saisies
    loginPost: (request, response) => {
        console.log(request.body);

        const login = request.body.login;
        const password = request.body.password;

        if (login === 'admin' && password === 'anafricanquestinvenezuela2019*') {
            request.session.isUserLogged = true;
            response.redirect('admin');
        } else {
            response.send('Oops we got a problem! Try again!');
        }


    },

    // Méthode qui affiche la page de l'administrateur
    showAdmin: (request, response) => {
        response.render('admin');
    },

    // Méthode qui affiche la page pour ajouter un nouvel article 
    showAddArticleForm: async (request, response) => {

        console.log(request.session);
        try {
            if (!request.session.isUserLogged) {
                response.redirect('/');
            }

            const countries = await Country.findAll();
            response.render('add', { countries });

        } catch (error) {
            console.error(error);

            response.status(500).json({ error: error.message });

        }
    },

    // Méthode qui ajoute un nouvel article 
    add: async (request, response) => {

        try {
            /* Etape 1: Récupérer l'image enregistrée dans notre formulaire, pour ensuite l'ajouter à notre BDD et à notre dossier images*/

            let sampleFile;
            let uploadPath;

            if (!request.files || Object.keys(request.files).length === 0) {
                return response.status(400).send('No files were uploaded');
            }

            // Stocker le fichier image dans une variable sampleFile
            sampleFile = request.files.sampleFile;
            // Stocker le chemin pour accéder à cette image dans une variable uploadPath
            uploadPath = '/Users/sabrinaludovicdelys/Desktop/Code/theafricanbard.com/public/images/' + sampleFile.name;

            // Utiliser mv() pour placer le fichier dans notre dossier images 
            sampleFile.mv(uploadPath);

            /* Etape 2: On récupère les pays sélectionné dans le formulaire */

            // Convertir les valeurs de type chaîne en valeurs de type numérique
            // Conversion compatible avec un tableau de valeurs correspondant à un article avec plusieurs pays
            const countryIdString = [...request.body.country];
            const countryId = countryIdString.map(element => parseInt(element, 10));

            // Stocker les informations du formulaire dans un objet qui représente le nouvel article à ajouter. 
            const infosArticle = {
                title: request.body.title,
                image_path: '/images/' + sampleFile.name,
                text: request.body.textarea,

                countries: countryId
            };


            // Trouve tout les pays qui correspondent graçe à leurs id 
            const countries = await Country.findAll({
                where: {
                    id: { [Op.in]: infosArticle.countries }
                }
            });

            /* Etape 3: Création d'un nouvel article */

            // Créer et ajouter un nouvel article à la base de données avec les informations de infosArticle + countries  
            const newArticle = await Article.create({
                title: infosArticle.title,
                image_path: infosArticle.image_path,
                text: infosArticle.text
            });

            // Associer notre nouvel article aux pays sélectionnés dans notre formulaire
            await newArticle.addCountries(countries, { as: 'countries' });

            // Rediriger vers la page avec plusieurs articles
            response.redirect('/articles');//admin/articles


        } catch (error) {

            console.error(error);
            response.status(500).json({ error: error.message });

        }
    },

    // Méthode pour afficher la page d'articles à supprimer 
    showDelete: async (request, response) => {
        try {
            if (!request.session.isUserLogged) {
                response.redirect('/');
            }
            const articles = await Article.findAll({
                include: "countries"
            });
            response.render('delete', { articles });
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }

    },

    // Méthode qui supprime un article 
    delete: async (request, response, next) => {

        const articleId = parseInt(request.params.id);

        console.log(articleId);

        try {

            const deletedArticle = await Article.destroy({where: {id: articleId}});

            if(deletedArticle >= 1) {
                response.redirect('/admin/delete');
            } else {
                next();
            }

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }

    }
};

