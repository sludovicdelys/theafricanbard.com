const { response } = require('express');
const { Article, Country } = require('../models');

module.exports = {

    // Méthode qui récupère tous les pays sans les articles
    findAll: async (request, response) => {
        try {
            const countries = await Country.findAll();
            response.render('country', {countries});
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }
    },

    // Méthode qui récupère tous les articles d'un pays

    findOne: async (request, response) => {
        try {
            countryId = parseInt(request.params.countryId);

            const country = await Country.findByPk(countryId,
                { include: 'articles' });

            response.render('filterCountry', {country});
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });

        }
    }
}