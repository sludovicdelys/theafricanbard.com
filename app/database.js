// Récupérer la classe Sequelize du module
const {Sequelize} = require('sequelize');

// Instancier cete classe avec la variable d'environnement PG_URL + options de configuration
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        timestamps: true,
        underscored: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = sequelize;