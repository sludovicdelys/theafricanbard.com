/* Script de création des tables pour le blog */

-- Sécurisation du script en plaçant toutes les requêtes dans une transaction

BEGIN; 

-- Supprime tout les tables si elles existent déjà
DROP TABLE IF EXISTS "article", "country", "article_has_country";

/* Création de la table "article"*/

CREATE TABLE "article" (
    "id" SERIAL PRIMARY KEY, 
    "title" TEXT NOT NULL,
    "image_path" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NULL
);

/* Création de la table "country"*/

CREATE TABLE "country" (
    "id" SERIAL PRIMARY KEY, 
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
);

/* Création de la table "article_has_country"*/

CREATE TABLE "article_has_country" (
    "article_id" INT NOT NULL REFERENCES "country"("id"), 
    "country_id" INT NOT NULL REFERENCES "article"("id"),
    PRIMARY KEY ("article_id", "country_id")
);

-- Seeding : remplissage des tables avec des données fictives

INSERT INTO "article" ("id", "title", "image_path", "text") VALUES
(1, 
'Across the Ocean', 
'image1.jpg', 
'Lorem ipsum dolor sit amet. Ex magnam Quis est iste quibusdam non placeat reprehenderit. Id corrupti molestiae ad sequi consequatur rem eveniet sunt qui porro est saepe mollitia? Id ipsa cupiditate aut corporis ullam vel suscipit nulla. Vel nihil sunt qui dolor voluptatem atque maiores qui nulla consequatur a reiciendis voluptatem sit laudantium nobis.
Sit odit voluptas quo provident internos quo saepe velit ut impedit voluptas ex praesentium deserunt et quia repudiandae. Rem voluptatem maiores ut voluptatem provident ut mollitia itaque. Rem consequuntur rerum eum sapiente laboriosam ut eveniet deleniti et sequi vitae et omnis nemo qui Quis nihil qui sunt aliquid.
Vel voluptas dolor cum adipisci quod qui itaque facilis id illo beatae qui Quis rerum eum aperiam corporis. Sit dolores beatae non assumenda natus cum dolorum itaque ad quidem tempore sit accusamus quae sit beatae voluptatum. Id esse error non quibusdam autem aut impedit tenetur quo aliquam quis. Vel quia voluptatem id explicabo fugit ut quis rerum hic quam dolorem sed debitis rerum et doloremque expedita.' 
)
