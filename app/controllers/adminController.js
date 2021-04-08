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
            response.redirect('http://localhost:3000/article/add');
        } else {
            response.send('Oops we got a problem! Try again!');
        }


    },

    // Méthode qui affiche la page pour ajouter un nouvel article 
    showAddArticleForm: async (request, response) => {

        console.log(request.session);
        try {
            if (!request.session.isUserLogged) {
                response.redirect('/');
            }

            const countries = await Country.findAll();
            response.render('addArticle', { countries });

        } catch (error) {
            console.error(error);

            response.status(500).json({ error: error.message });

        }
    },

    // Méthode qui récupère les données du formulaire envoyées en POST 
    addArticle: async (request, response) => {

        try {
            let sampleFile;
            let uploadPath;

            if (!request.files || Object.keys(request.files).length === 0) {
                return response.status(400).send('No files were uploaded');
            }
            // console.log(request.files);

            // name of the input is sampleFile
            sampleFile = request.files.sampleFile;
            uploadPath = '/Users/sabrinaludovicdelys/Desktop/Code/theafricanbard.com/public/images/' + sampleFile.name;

            // Use mv() to place file on the server
            sampleFile.mv(uploadPath);


            // For an article with multiple countries we need to convert an array string values to integer values 
            const countryIdString = request.body.country;
            // console.log(countryIdString);
            const countryId = countryIdString.map(element => parseInt(element, 10));

            console.log(countryId);


            // Stocker les informations du formulaire dans un objet qui représente le nouvel article à ajouter. 
            const infosArticle = {
                title: request.body.title,
                image_path: '/images/' + sampleFile.name,
                text: request.body.textarea,

                countries: countryId
            };


            console.log(infosArticle);

            // Trouve tout les pays qui correspondent graçe à leurs id 
            const countries = await Country.findAll({
                where: {
                    id: {[Op.in]: infosArticle.countries }
                }
            });

            console.log(countries);

            //Créer et ajouter un nouvel article à la base de données avec les informations de infosArticle + countries  
            const newArticle = await Article.create({
                title: infosArticle.title,
                image_path: infosArticle.image_path,
                text: infosArticle.text,
                countries: countries
            }, {
                include: ['countries']
            });


            response.send(newArticle);


        } catch (error) {

            console.error(error);
            response.status(500).json({ error: error.message });

        }
    }
};

