// On récupère les classes nécessaire

const Article = require('./article');
const Country = require('./country');

// Association entre article et country : n,n 

Article.belongsToMany(Country, {
    foreignKey: 'article_id',
    otherKey: 'country_id',
    as: 'countries',
    through: 'article_has_country'
});

Country.belongsToMany(Article, {
    foreignKey: 'country_id',
    otherKey: 'article_id',
    as: 'articles',
    through: 'article_has_country'
});

module.exports = {
    Article,
    Country
};
