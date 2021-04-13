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

- Bonus: Plusieurs 'auteurs' peuvent se connecter à leurs profil et ajouter ou supprimer un article 


# Notes/Debugging Log

## Des images dans la BDD ?

_28 Mars 2021_

- Il est possible de stocker des images dans la BDD mais ce n'est pas une bonne pratique. 
Il faudrait plutôt stocker les images dans un dossier et les chemins vers ces images dans la base de données. 

- "Images can get quite large, greater than 1MB. And so storing images in a database can potentially put unnecessary load on your database and the network between your database and your web server if they're on different hosts".
[Stackoverflow](https://stackoverflow.com/questions/6472233/can-i-store-images-in-mysql)

- Les base de données d'aujourd'hui sont tout à fait capable de stocker de grandes images, mais je choisis de stocker les images enregistrées par l'administrateur dans un dossier images, qui sera ensuite ajouter a la base de données. 

-------

## Il y a beaucoup de textes dans ma requête SQL

_29 Mars 2021_

- J'aimerais pouvoir importer dans ma table un fichier qui contient le texte de mon blog. Écrire tout le texte dans ma requête SQL rends mon code illisible, ce qui n'est pas optimale. 

- Rien à faire, le fichier SQL n'est pas censé être 'beau'. Il faut que j'écrive tout les paragraphes de mes articles dans ma transaction SQL.

-------

## Pouvoir récupérer la colonne country_id dans ma requêtes des articles

_01 Avril 2021_

- Dans mon controller ```articleController``` je récupère tout mes articles sur la route ```'/articles'```, mais je ne récupère les pays auxquelles ils correspondent. 

- Mon object sequelize n'était pas bien configurer dans mon fichier ```database.js```. Il fallait que j'indique à sequelize plusieurs choses: 
    - ```timestamps:false``` afin de ne pas avoir la création automatique de ```createdAt``` et ```updatedAt``` pour tout mes models
    - Dans mon fichier ```article.js``` je configure mon  ```timestamps: true```, ```createdAt: 'created_at'```  et ```updatedAt: 'updated_at' ``` pour pouvoir avoir ces colonnes dans ma table 'article'. 
    - Dans mon fichier ```country.js ``` je configure mon timestamps, createdAt et updatedAt a ```false``` pour ne pas que sequelize ajoute directement ces colonnes et éviter les erreurs avec un status 500 dans ma requête.  
    ![Erreur 500 Sequelize](images/erreur500_sequelize.png)
    
-------

## Récupérer un fichier en POST et l'ajouter dans mon dossier 'images'

_07 Avril 2021_

- Dans mon controller ```adminController``` j'ai configurer une méthode ```addArticle``` afin de pouvoir récupérer les données envoyer en POST de mon formulaire qui se trouve dans mon fichier ```addArticle.ejs```. 

- J'ai télécharger un npm package qui s'appelle ```express-fileupload``` et j'ai utiliser la fonction ```mv()``` pour: 
    - récupérer l'image qui se trouve dans ```request.files```
    - définir un chemin dans ```fileUpload``` vers le dossier souhaité 
    - enregistrer l'image dans le bon dossier ```'/public/images/mon-image.png/```

[GitHub express-fileupload](https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload)

- ERREUR: 
![Erreur](images/erreur-fileupload1.png)

```(node:87604) UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, open '/Users/sabrinaludovicdelys/Desktop/Code/theafricanbard.com/app/controllers/public/images/admin.jpg'```

- Je n'avais pas configurer le bon chemin vers mon dossier 

- SOLUTION: 

```
uploadPath = '/Users/sabrinaludovicdelys/Desktop/Code/theafricanbard.com/public/images/' + sampleFile.name;
```

-------

## Un operateur Sequelize qui permet une requête SQL du type IN [1, 2]

_08 Avril 2021_

- Dans mon formulaire je récupère le titre, l'image, le text, et les id des pays associés à mon article. 
- Dans mon test, j'aimerais ajouter un article associé à plusieurs pays et stocker cette information dans ma BDD avec l'instance ```Article.create()```.
- Avec ```findByPk``` je peux récupérer un pays correspondant à un seul id
- J'aimerais récupérer plusieurs pays en faisant référance à plusieurs ids, avec une requête de ce type: 
```
SELECT * FROM country WHERE id IN (3,4);
```

- SOLUTION : [Sequelize Operators](https://sequelize.org/master/manual/model-querying-basics.html#operators)

```
 // Trouve tout les pays qui correspondent graçe à leurs id 

const countries = await Country.findAll({
where: {
id: { [Op.in]: infosArticle.countries }
}
});
```
-------

## Créer un nouvel article, puis l'associer à des pays existants dans la table 'country'

_11 Avril 2021_

- Après avoir récupérer un tableau de tout les pays que je souhaitais associer à mon article, j'ai utiliser la méthode Sequelize ```.create()``` pour pouvoir ajouter un nouvel article et en même temps associer ce nouvel article avec des pays. 

- Je me suis servie de la documentation de Sequelize qui concernent la création d'instance avec des association [Creating with Associations - BelongsToMany association](https://sequelize.org/master/manual/creating-with-associations.html). J'ai reçu une erreur de la part de mon programme. 

```
-ERROR: ERROR: duplicate key value violates unique constraint "country_pkey"
```

- Il se trouve que dans l'example de la documentation de Sequelize, il est indiqué que l'on peut créer une instance avec des associations en une seule étape uniquement si tout les éléments sont créer pour la première fois. Avec l'erreur mon programme m'indique que il ne peut pas ajouter un pays qui existe déjà. 

- SOLUTION: Étant donné que une association est définie entre mes deux modèles, les instances de ces modèles bénéficient de méthodes spéciales pour intéragir avec leurs homologues associés. [Special methods/mixins added to instances](https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances)

```
// Trouve tout les pays qui correspondent graçe à leurs id 
    const countries = await Country.findAll({
        where: {
            id: { [Op.in]: infosArticle.countries }
            }
        });

/* Etape 3: Création d'un nouvel article */

// Créer et ajouter un nouvel article à la base de données avec les informations de infosArticle + countries  
    const newArticle = await Article.create({
        title: infosArticle.title,
        image_path: infosArticle.image_path,
        text: infosArticle.text
        });

// Associer notre nouvel article aux pays sélectionnés dans notre formulaire
    await newArticle.addCountries(countries, {as: 'countries'});
```



