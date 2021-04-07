const { response, request } = require('express');
const { Article, Country } = require('../models');

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

            // name of the input is sampleFile

            console.log(`What is inside ? ${request.files}`);
            console.log(request.files);


            sampleFile = request.files.sampleFile;
            uploadPath = '/Users/sabrinaludovicdelys/Desktop/Code/theafricanbard.com/public/images/' + sampleFile.name;
            console.log(sampleFile.name);



            console.log(`sampleFile: ${sampleFile}`);
            console.log(`Upload path: ${uploadPath}`);


            // Use mv() to place file on the server
            sampleFile.mv(uploadPath, function(error) {
                if (error) {
                      return response.status(500).send(error); 
                }
                response.send('File uploaded');
            });
           

        } catch (error) {

            console.error(error);
            response.status(500).json({ error: error.message });

        }
    }
};

