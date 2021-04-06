const { response, request } = require('express');
const database = require('../database');

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
            response.send('Connexion successful!');
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
};

