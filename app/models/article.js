// Recupère du package les classes nécessaires 
const {Model, DataTypes} = require('sequelize');

// Récupère le client connecté et prêt à l'emploi
const sequelize = require('../database');

// Définit la classe, et la faire heriter de Model du Sequelize
class Article extends Model {}; 

// Configure la classe
Article.init({
    title: DataTypes.TEXT, 
    image_path: DataTypes.STRING,
    text: DataTypes.TEXT

}, {
    sequelize,
    tableName: 'article'
});

module.exports = Article; 