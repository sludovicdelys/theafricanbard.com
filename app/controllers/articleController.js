const { response } = require('express');
const { Article, Country } = require('../models');

module.exports = {

    // Méthode qui récupère tous les articles avec les pays associés 
    findAll: async (request, response) => {
        try {
            const articles = await Article.findAll({
                include: "countries"
            });
            response.json(articles);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }
    },

    // Méthode qui récupère un article avec les pays associés 
    findOne: async (request, response) => {
        try {
            articleId = request.params.id;

            const article = await Article.findByPk(articleId,
                { include: 'countries' });
            response.json(article);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });

        }
    }
}