const { response } = require('express');
const { Article, Country } = require('../models');

module.exports = {

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