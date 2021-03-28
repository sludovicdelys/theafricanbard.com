# Projet Travel Blog 

## Analyse préliminaire 

- une page web avec des articles de voyage 
- un administrateur qui peut se connecter 
- les visiteurs peuvent lire des articles 
- les visiteurs peuvent contacter l'auteur à l'aide d'un formulaire 
- l'administrateur peut ajouter un nouvel article
- un article possède une photo ou plusieurs photos
- un article possède un titre 
- un article possède une courte phrase détaillant un passage intéressant
- un article possède une description 
- un article possède une destination assignée 

- Bonus: un utilisateur peut acheter une photo dans la boutique en ligne

## Notes 

### Des images dans la BDD ?

_28 Mars 2020_

Il est possible de stocker des images dans la BDD mais ce n'est pas une bonne pratique. 
Il faudrait plutôt stocker les images dans un dossier et les chemins vers ces images dans la base de données. 

"Images can get quite large, greater than 1MB. And so storing images in a database can potentially put unnecessary load on your database and the network between your database and your web server if they're on different hosts".
[Stackoverflow](https://stackoverflow.com/questions/6472233/can-i-store-images-in-mysql)

Les base de données d'aujourd'hui sont tout à fait capable de stocker de grandes images, mais je choisis de stocker les images enregistrées par l'administrateur dans un dossier images, qui sera ensuite ajouter a la base de données. 
