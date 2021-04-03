// Importer les variables d'environnement
require('dotenv').config();

const express = require('express');
const router = require('./app/router');

const app = express();

// En cas d'erreur avec notre variable d'environnment, on utilise la valeur par défaut
const PORT = process.env.PORT || 3000;

// Configuration EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Récupérer les infos envoyées en POST
app.use(express.urlencoded({extended: true}));

app.use(express.static('./static/images'));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}/`);
});

