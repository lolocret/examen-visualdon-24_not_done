// Fichier : src/index.js
import * as d3 from "d3";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "./style.css";

const dataArbres = "../data/arbres_communes.geojson";
const dataCentres = "../data/centres_communes.geojson";

Promise.all([
    d3.json(dataArbres),
    d3.json(dataCentres)
]).then(([arbresCommunes, centresCommunes]) => {
    arbresCommunes.features.forEach(f => {
        f.properties.treesPerKm2 = f.properties.n_trees / f.properties.area_km2;
    });

    const maxFeature = arbresCommunes.features.reduce((a, b) =>
        a.properties.treesPerKm2 > b.properties.treesPerKm2 ? a : b);
    console.log("Commune la plus verte:", maxFeature.properties.name, maxFeature.properties.treesPerKm2);

    const top10 = [...arbresCommunes.features]
        .sort((a, b) => b.properties.treesPerKm2 - a.properties.treesPerKm2)
        .slice(0, 10);

    const map = L.map('map').setView([46.6, 6.6], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const values = arbresCommunes.features.map(d => d.properties.treesPerKm2);
    const color = d3.scaleQuantize()
        .domain([0, d3.max(values)])
        .range(d3.schemeGreens[5]);

    function style(feature) {
        return {
            fillColor: color(feature.properties.treesPerKm2),
            weight: 1,
            color: '#555',
            fillOpacity: 0.7
        };
    }

    function highlight(e) {
        e.target.setStyle({ weight: 3, color: '#000' });
        e.target.bringToFront();
    }
    function reset(e) {
        geojson.resetStyle(e.target);
    }

    function onEachFeature(feature, layer) {
        layer.bindTooltip(`${feature.properties.name}<br>${feature.properties.treesPerKm2.toFixed(1)} arbres/km²`);
        layer.on({ mouseover: highlight, mouseout: reset });
    }

    const geojson = L.geoJSON(arbresCommunes, { style, onEachFeature }).addTo(map);

    const titleControl = L.control({ position: 'topleft' });
    titleControl.onAdd = () => {
        const div = L.DomUtil.create('div', 'title');
        div.innerHTML = '<h3>Arbres par km²</h3>';
        return div;
    };
    titleControl.addTo(map);

    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'legend');
        const grades = color.range().map(d => color.invertExtent(d)[0]);
        div.innerHTML += '<strong>arbres/km²</strong><br>';
        for (let i = 0; i < grades.length; i++) {
            const from = Math.round(grades[i]);
            const to = Math.round(grades[i + 1]);
            div.innerHTML +=
                '<i style="background:' + color(grades[i]) + '"></i> ' +
                from + (to ? '&ndash;' + to + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);

    const valueById = new Map(arbresCommunes.features.map(d => [d.properties.id, d.properties.treesPerKm2]));
    const radius = d3.scaleSqrt()
        .domain([0, d3.max(values)])
        .range([0, 25]);

    L.geoJSON(centresCommunes, {
        pointToLayer: (feature, latlng) => {
            const v = valueById.get(feature.properties.id) || 0;
            return L.circleMarker(latlng, {
                radius: radius(v),
                color: '#e6550d',
                fillColor: '#fd8d3c',
                fillOpacity: 0.7,
                weight: 1
            }).bindTooltip(`${feature.properties.name}<br>${v.toFixed(1)} arbres/km²<br>(rayon ∝ √valeur)`);
        }
    }).addTo(map);

    const margin = { top: 20, right: 20, bottom: 30, left: 150 };
    const width = document.getElementById('barchart').clientWidth - margin.left - margin.right;
    const height = document.getElementById('barchart').clientHeight - margin.top - margin.bottom;

    const svg = d3.select('#barchart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3.scaleBand()
        .domain(top10.map(d => d.properties.name))
        .range([0, height])
        .padding(0.1);

    const x = d3.scaleLinear()
        .domain([0, d3.max(top10, d => d.properties.treesPerKm2)])
        .range([0, width]);

    svg.append('g').call(d3.axisLeft(y));
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.selectAll('rect')
        .data(top10)
        .enter()
        .append('rect')
        .attr('y', d => y(d.properties.name))
        .attr('height', y.bandwidth())
        .attr('x', 0)
        .attr('width', 0)
        .attr('fill', 'steelblue')
        .transition()
        .duration(1000)
        .ease(d3.easeCubicOut)
        .attr('width', d => x(d.properties.treesPerKm2));
});
