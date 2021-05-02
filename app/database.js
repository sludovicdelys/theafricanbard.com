// Récupérer la classe Sequelize du module
const {Sequelize} = require('sequelize');

// Instancier cette classe avec la variable d'environnement PG_URL + options de configuration
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        timestamps:false,
        underscored: true
    }
});

module.exports = sequelize;