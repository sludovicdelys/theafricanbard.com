//*THE SERVER*//

// import environment variable 
require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const articles = require('./data/article.json');

//The port is located in the .env, if no access choose default port 5000
const PORT = process.env.PORT || 5000;

//Setting up a new express server
const app = express();

//Views usage settings:
app.set('view engine', 'ejs');
app.set('views', 'views');

// Static files (css et js-front) are in the folder "static"
app.use(express.static('static'));

//Tell express to use the middlewares set up in our router

//Get the server running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});