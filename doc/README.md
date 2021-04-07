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

_28 Mars 2021_

- Il est possible de stocker des images dans la BDD mais ce n'est pas une bonne pratique. 
Il faudrait plutôt stocker les images dans un dossier et les chemins vers ces images dans la base de données. 

- "Images can get quite large, greater than 1MB. And so storing images in a database can potentially put unnecessary load on your database and the network between your database and your web server if they're on different hosts".
[Stackoverflow](https://stackoverflow.com/questions/6472233/can-i-store-images-in-mysql)

- Les base de données d'aujourd'hui sont tout à fait capable de stocker de grandes images, mais je choisis de stocker les images enregistrées par l'administrateur dans un dossier images, qui sera ensuite ajouter a la base de données. 

### Il y a beaucoup de textes dans ma requête SQL

_29 Mars 2021_

- J'aimerais pouvoir importer dans ma table un fichier qui contient le texte de mon blog. Écrire tout le texte dans ma requête SQL rends mon code illisible, ce qui n'est pas optimale. 

- Rien à faire, le fichier SQL n'est pas censé être 'beau'. Il faut que j'écrive tout les paragraphes de mes articles dans ma transaction SQL. 

### Pouvoir récupérer la colonne country_id dans ma requêtes des articles

_01 Avril 2021_

- Dans mon controller ```articleController``` je récupère tout mes articles sur la route ```'/articles'```, mais je ne récupère les pays auxquelles ils correspondent. 

- Mon object sequelize n'était pas bien configurer dans mon fichier ```database.js```. Il fallait que j'indique à sequelize plusieurs choses: 
    - ```timestamps:false``` afin de ne pas avoir la création automatique de ```createdAt``` et ```updatedAt``` pour tout mes models
    - Dans mon fichier ```article.js``` je configure mon  ```timestamps: true```, ```createdAt: 'created_at'```  et ```updatedAt: 'updated_at' ``` pour pouvoir avoir ces colonnes dans ma table 'article'. 
    - Dans mon fichier ```country.js ``` je configure mon timestamps, createdAt et updatedAt a ```false``` pour ne pas que sequelize ajoute directement ces colonnes et éviter les erreurs avec un status 500 dans ma requête.  
    ![Erreur 500 Sequelize](images/erreur500_sequelize.png)
    

### Ajouter récupérer en POST  dans mon dossier 'images'

_07 Avril 2021_

- Dans mon controller ```adminController``` j'ai configurer une méthode ```addArticle``` afin de pouvoir récupérer les données envoyer en POST de mon formulaie qui se trouve dans mon fichier ```addArticle.ejs```. 

- J'ai télécharger un npm package qui s'appelle ```express-fileupload``` et j'ai utiliser la fonction ```mv()``` pour: 
    - récupérer l'image qui se trouve dans ```request.files```
    - définir un chemin dans ```fileUpload``` vers le dossier souhaité 
    - enregistrer l'image dans le bon dossier ```'/public/images/mon-image.png/```

[GitHub express-fileupload](https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload)

- ERREUR: 
![Erreur](images/erreur-fileupload1.png)

```(node:87604) UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, open '/Users/sabrinaludovicdelys/Desktop/Code/theafricanbard.com/app/controllers/public/images/admin.jpg'```

Je n'avais pas configurer le bon chemin vers mon dossier 

- SOLUTION: 

``` uploadPath = '/Users/sabrinaludovicdelys/Desktop/Code/theafricanbard.com/public/images/' + sampleFile.name```



