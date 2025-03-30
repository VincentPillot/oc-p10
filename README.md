# Automatisez des tests pour une boutique en ligne

## A propos
Projet n°10 de la formation de Testeur logiciel sur Openclassrooms. Analyse & mise en place de tests autoamtisés avec Cypress.

## Table des matières
- [Installation](#installation-du-projet)
- [Prérequis](#prérequis)
- [Installation & commandes du projet](#installation--commandes-du-projet)
- [Les différents tests](#les-différents-tests)
- [Documentation de Cypress](#documentation-cypress)
- [Ojectifs du projet](#objectifs-du-projet)

## Prérequis
Installer les prérequis suivant :
- [NodeJS](https://nodejs.org/)
- [npm](https://docs.npmjs.com/about-npm)
- [Docker](https://www.docker.com/)
- [cypress](https://docs.cypress.io/app/get-started/install-cypress)

## Installation & commandes du projet

Une fois les prérequis installer :
- Cloner le code
- Exécuter la commande : docker-compose up à la racine du projet
- Exécuter la commande : npx cypress run pour lancer tous les tests en ligne de commande
- Exécuter la commande : npx cypress open pour ouvrir une fenêtre dédiée, puis cliquer sur E2E testing et enfin choisir le navigateur désiré. Une page va s'ouvrir avec différents fichiers de tests. 
- Cliquer sur le fichier souhaité pour voir le test se dérouler.
- Il est possible d'avoir un modèle de report différents en allant dans le fichier /reports et d'ouvrir les pages HTML associées.
- Une fois l'utilisation du projet terminé, Exécuter la commande : docker-compose down

## Les différents tests

- ### Smoke tests :
    - Vérification sur l'UI du formulaire de connexion
    - Vérification de la présence du champ du stock d'un produit sur la page de se dernier.
    - Vérification de la présence du bouton "Ajouter au panier" sur la page d'un produit.
- ### Test API : 
    - Tests sur différents endpoints.
    - Tests sur l'ajout de produit au panier avec des valeurs valide & invalide
    - Tests sur la connexion
    - Tests et vérification faille XSS sur les commentaires d'un produit renvoyer par l'API
- ### Test sur la connexion
    - Tests automatiser sur la connexion via le formulaire présent sur la page de login
- ### Tests sur le panier
    - Tests sur le bon fonctionnement du panier (ajout d'un produit, vérifier que ce soit le bon, suppression d'un produit...)
    - Tests sur différentes valeurs sur la quantité d'un même produit ajouter au panier


## Documentation Cypress
[Lien vers la documentation de Cypress](https://docs.cypress.io/app/get-started/why-cypress)

## Objectifs du projet
Ce projet à pour objectif de : 
- Analyser les différents besoins en automatistations de tests sur le projet
- L'automatisation des tests via des scripts (Cypress)
- Rédiger un bilan de tests automatisés