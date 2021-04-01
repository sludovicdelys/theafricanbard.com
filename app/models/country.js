// Recupère du package les classes nécessaires 
const {Model, DataTypes} = require('sequelize');

// Récupère le client connecté et prêt à l'emploi
const sequelize = require('../database');

// Définit la classe, et la faire heriter de Model du Sequelize
class Country extends Model {}; 

// Configure la classe
Country.init({
    name: DataTypes.TEXT, 
    color: DataTypes.TEXT

}, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'country'
});

module.exports = Country; 