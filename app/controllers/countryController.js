const { response } = require('express');
const { Article, Country } = require('../models');

module.exports = {

    // Méthode qui récupère tous les pays sans les articles
    findAll: async (request, response) => {
        try {
            const countries = await Country.findAll();
            response.json(countries);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }
    },

    // Méthode qui récupère tous les articles d'un pays
    
    // findOne: async (request, response) => {
    //     try {
    //         countryId = request.params.id;

    //         const article = await Country.findByPk(countryId,
    //             { include: 'articles' });
    //         response.json(country);
    //     } catch (error) {
    //         console.error(error);
    //         response.status(500).json({ error: error.message });

    //     }
    // }
}