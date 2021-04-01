const {Article} = require('../models');

module.exports = {
    findAll: async (request, response) => {
        try {
            const articles = await Article.findAll({
                include: 'countries'});
            response.json(articles);
        } catch (error) {
            console.error(error);
            response.status(500).json({error: error.message});
        }
    },
}