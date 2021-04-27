// Importer les variables d'environnement
require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const app = express();
const sanitize = require('./app/middlewares/request-sanitizer');

// En cas d'erreur avec notre variable d'environnment, on utilise la valeur par défaut
const PORT = process.env.PORT || 3000;

// Options par défault de fileUpload

app.use(fileUpload());

// Configuration EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Gérer les sessions
app.use(session({
    secret: 'topsecretstuffyoucantsee',
    resave: false,
    saveUninitialized: false
}));

// Récupérer les infos envoyées en POST
app.use(express.urlencoded({extended: true}));

// Gérer les données statiques 
app.use(express.static('./public'));

// Protéger des injections
app.use(sanitize);

app.use(router);

app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}/`);
});

