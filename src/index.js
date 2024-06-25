import * as d3 from "d3";


// Au cas où vous avez besoin de Leaflet
import L from "leaflet";
import 'leaflet/dist/leaflet.css';


/*
========================================================================================================================
1. Dessin SVG (15 points)
========================================================================================================================
Vous pouvez dessiner la figure soit à partir d'ici ou directement dans l'HTML (index.html).
*/




const dataArbres = await d3.json('../data/arbres_communes.geojson')
const dataCentres = await d3.json('../data/centres_communes.geojson')


console.log('Contours géographiques (path) avec n_trees', dataArbres)
console.log('Centres géométriques (circle)', dataCentres)

        /*
========================================================================================================================
2. Manipulation des données (15 points)
========================================================================================================================
        */

        // 2.1 La commune ayant le plus d'arbres par km2---


        // 2.2 Les 10 communes ayant le plus d'arbres par km2 ---


        // 2.3 Est-ce qu’on peut faire confiance aux données extraites d’OpenStreetMap ? À quelle·s autre·s entité·s pourrait-on faire appel ? ---


        /*
========================================================================================================================
3. Visualisations (70 points)
========================================================================================================================
        */

        // --- 3.1 Carte choroplète ---










        // --- 3.2 Carte à bulles ---
     











        // --- 3.3 Barchart ---










