# Examen Visualdon - 26 juin 2024

Le travail sera rendu au plus tard à 16h15, par e-mail à noemi.romano@heig-vd.ch.

Vous rendrez un **fichier ZIP** de tout votre projet excepté le dossier `node_modules` et vous donnerez votre nom de famille, prénom et classe à ce dossier (*nom_prenom_classe.zip*). Vous êtes responsable de son contenu et devez vous assurer de la bonne réception du dossier avant de quitter la salle.

## Installation
* Clonez la [repository](https://github.com/romanoe/examen-visualdon-24/) 
  
 ```bash
git clone https://github.com/romanoe/examen-visualdon-24.git
  ```

* Rentrez dans le dossier *examen-visualdon-24* : 
  
```bash 
cd examen-visualdon-24
```

* Installez les packages nécessaires : 
 
```bash
npm install
```

* Démarrez le serveur : 
  
```bash
npm run dev
```

:rocket: Vous devriez avoir accès à votre serveur local sur [localhost:5173](http:localhost:5173) :rocket:

## Exercice 1 - SVG (15 points)
Reproduire le dessin suivant dans le navigateur à l’aide des outils que vous avez appris en cours.

> :exclamation: La grille est à titre indicatif et elle ne doit pas être dessinée.

![dessin](assets/img/dessin-svg.png)



## Les arbres du canton de Vaud :deciduous_tree: 

### Données

Pour la suite des exercices, vous avez à disposition deux jeux de données: 

1.  `data/arbres_communes.geojson` : Les contours des communes avec le nombre d'arbres pour chacune des communes  
2.  `data/centres_communes.geojson`: Les centres géométriques des communes 


S'agissant de fichiers `geojson`, la composante géographique est directement dans les données (features). Les données sont structurées de la manière suivante :

#### `data/arbres_communes.geojson` 
  
* `id` : identifiant commune
* `name`: nom de la commune (p. ex. _Yverdon les bains_)
* `n_trees` : nombre d'arbres
* `area_km2`: superficie de la commune en km²


#### `data/centres_communes.geojson`

* `id` : identifiant commune
* `name`: nom de la commune (p. ex. _Yverdon les bains_)


La clé commune entre les deux jeux de données est l'identitifiant (`id`). 


## Exercice 2 - Manipulations des données (15 points)

Apportez les manipulations suivantes et imprimez les résultats dans la console :

1. La **commune** ayant le plus grand nombre d'arbres par km² ainsi que le **nombre d'arbres par km²** :dart: **5 points** :dart:
2. Les **10 communes** qui ont le plus grand nombre d'arbre par km², ainsi que leur **nombre d'arbres par km²** :dart: **5 points** :dart:
3. Peut-on considérer les données sur les arbres extraites d'OpenStreetMap comme fiables ? Quelles autres entités pourraient fournir des données alternatives ou complémentaires ? Imprimez la réponse dans la console. :dart: **5 points** :dart:


## Exercice 3 - Visualisations (70 points)
Avec les données de l'exercice précédent, utilisez les outils que vous avez appris en cours pour créer les visualisations suivantes. Complétez les fichiers `index.html` et `src/index.js` afin de réaliser les visualisations demandées.

> :exclamation: **D3.js** et **Leaflet** sont déjà installés et importés dans `src/index.js` (à vous le choix d'utiliser l'un et/ou l'autre pour les exercices de cartographie). Si vous souhaitez utiliser une autre bibliothèque, vous devez l'installer à l'aide de `npm` et l'importer de la même manière.

### 3.1 Carte choroplète (25 points)


1. Visualisez une carte choroplète de toutes les communes en fonction du **nombre d'arbres par km²** :dart: **10 points** :dart:

2. Ajoutez une info-bulle qui affiche le **nom de la commune** et le **nombre d'arbres par km²** lorsque survolées. De plus, augmentez l'épaisseur du contour de la commune lors du survol. :dart: **10 points** :dart:
  
3. Intégrez un titre et une légende à la carte. :dart: **5 points** :dart:

> :bulb: Données à utiliser: `data/arbres_communes.geojson` 


### 3.2 Carte à bulles (25 points)

Nous allons reproduire une carte à bulles (bubble map), comme ci-dessous :

![bubble map](assets/img/bubble_map.png)


Veuillez suivre les instructions suivantes :

1. Construisez une carte comme dans l'image ci-dessus, en utilisant le **nombre d'arbres par km²** comme rayon des cercles, avec une échelle adaptée :dart: **10 points** :dart:

2. Rajoutez une info-bulle si on survole avec la souris :dart: **10 points** :dart:

3. Créez une animation d'entrée pour les cercles (r=0 à r=**nombre d'arbres par km²**`) avec une fonction d'accélération de votre choix.  :dart: **5 points** :dart:


> :bulb: Données à utiliser: `data/centres_communes.geojson` , `data/arbres_communes.geojson`


### 3.3 Diagramme en bâtons (20 points)

1. Créez un diagramme en bâton horizontal (horizontal barchart) des 10 communes ayant le plus d'arbres par km², avec en axe Y les **noms des communes** et en axe X le **nombre d'arbres par km²**  (N'oubliez pas les axes !) :dart: **15 points** :dart:

   
2. Implémentez une animation d'entrée avec une transition de votre choix en utilisant D3. :dart: **5 points** :dart:

> :bulb: Données à utiliser: `data/arbres_communes.geojson` 
