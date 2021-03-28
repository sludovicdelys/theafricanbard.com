/* Script de création des tables pour le blog */

-- Sécurisation du script en plaçant toutes les requêtes dans une transaction

BEGIN; 

-- Supprime tout les tables si elles existent déjà
DROP TABLE IF EXISTS "article", "country", "article_has_country";

/* Création de la table "article"*/

CREATE TABLE "article" (
    "id" SERIAL PRIMARY KEY, 
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
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


