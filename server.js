//*THE SERVER*//

//Importing express
const express = require('express');

//Importing router
//const router = require('./app/router');

//Importing array of articles
const articles = require('./data/article.json');

//We allow the user to change the port number any time by using a variable 
const PORT = 3000;

//Setting up a new express server
const app = express();

//Views usage settings:
// - EJS engine
app.set('view engine', 'ejs');
// - folder for the files
app.set('views', 'views');

// Static files (css et js-front) are in the folder "static"
app.use(express.static('static'));

//Tell express to use the middlewares set up in our router

//Get the server running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});