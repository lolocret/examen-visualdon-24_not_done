import * as d3 from "d3";


/*
========================================================================================================================
1. Dessin SVG (15 points)
========================================================================================================================
Vous pouvez dessiner la figure soit à partir d'ici ou directement dans l'HTML (index.html).
*/

const dataArbres = '../data/arbres_communes_vaud.geojson'
const dataCentroides = '../data/centroids_vaud.geojson'

// Import des données
Promise.all([
    d3.json(dataArbres),
    d3.json(dataCentroides)
]).then(([arbres, centroides]) => {

        // Données
        console.log('Données Communes', arbres)
        console.log('Données Centroides', centroides)

        /*
========================================================================================================================
2. Manipulation des données (15 points)
========================================================================================================================
        */

        // --- 2.1 La commune ---


        // --- 2.2 La commune avec le pourcentage de non le plus elevé ---


        // --- 2.3 Le résultat de la votation sur l'ensemble du canton (moyenne pourcentage oui, moyenne pourcentage non dans tout le canton) ---



        /*
========================================================================================================================
3. Visualisations (70 points)
========================================================================================================================
        */

        // Constantes
        const margin = {top: 10, right: 40, bottom: 20, left: 40},
            width = 0.8 * window.innerWidth - margin.left - margin.right,
            height = 0.7 * window.innerHeight + margin.top + margin.bottom;


        // --- 3.1 Carte choroplète ---
        const mapSvg = d3.select('#map')
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const projection = d3.geoMercator()
            .fitSize([width, height], {"type": "FeatureCollection", "features": arbres})

        const path = d3.geoPath()
            .projection(projection)



        // ---------------------------- Continuez ci-dessous -----------------------------------









        // --- 3.2 Barchart ---
        const barchartSvg = d3.select('#barchart')
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // ---------------------------- Continuez ci-dessous -----------------------------------











    })