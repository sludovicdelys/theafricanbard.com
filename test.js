/*Fichier test pour vérifier que tout fonctionne*/

require('dotenv').config();

// Importer les modèles
const { Article, Country } = require('./app/models/');
//const {Country} = require('./app/models/');

// Article.findAll().catch(error => {
//     console.error(error);
// }).then(articles => {
//     for (const article of articles) {
//         console.log(article.toJSON());
//     }
// });

Article.findByPk(7).catch(error => {
    console.error(error);
}).then(article => {
    console.log(`The title of the ${article.id} is : "${article.title}"`);
});