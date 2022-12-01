<script setup>
// import éléments de vue
import { onMounted, ref, reactive } from 'vue'
// import leaflet
import * as Leaflet from 'leaflet'
// css leaflet
import 'leaflet/dist/leaflet.css'

// Canevas leaflet pour la carte
let tileLayer = Leaflet.tileLayer
// Initialisation de la carte sous forme de ref
let map = ref()

let liste = ref()

let Selection = ref()

let Eol = ref()


// Lorsque le composant est monté dans la vue
// On affiche la carte
onMounted(async () => {
    // Caractéristiques visuelle de la carte
    tileLayer = Leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
    );

    // Création de la carte sur la div ayant : id='map'
    map = Leaflet.map('map',
        {
            zoomControl: true,    // Contrôle du Zoom
            layers: [tileLayer],  // Canevas pour dessiner la carte
            maxZoom: 18,          // Zoom maxi autorié
            minZoom: 6            // Zomm mini autorisé
        })
        // projection de la carte avec centrage aux coordonnées indiquées, avec facteur d'agrandissemet 
        .setView([47.495328, 6.8044455], 2)


    await fetch('https://geo.api.gouv.fr/regions')

        .then(response => response.json())
        .then(response => {
            liste.value = response;
            console.log("response", liste);
            Selection.value = "0"
        })




})

const selection = async (nom_reg) => {
    console.log("departement selectionné", nom_reg)

    let request = 'https://opendata.agenceore.fr/api/records/1.0/search/?dataset=installations-de-production-eolien-par-commune&q=&facet=nom_dept&facet=libepci&facet=nom_reg&facet=date_des_donnees&facet=s_3_prod_i_regime_d_exploitation&facet=s_3_prod_d_filiere&refine.nom_reg=' + nom_reg
        + "&q=&rows=10000";
    console.log("request", request)

    await fetch(request)

        .then(response => response.json())
        .then(response => {
            Eol.value = response.records;

            console.log("Liste des installations", Eol);


            let markers = Leaflet.featureGroup();
            let myIcon = Leaflet.icon({
                iconUrl: 'images/marker-icon.png', // Image de l'icône
                shadowUrl: 'images/marker-shadow.png', // Image de l'ombre0
                iconSize: [25, 41], // taille de l'icône
                shadowSize: [25, 41], // taille de l'ombre
                iconAnchor: [0, 0], // point de position de l'icône
                shadowAnchor: [-10, -10],  // point de position de l'ombre
                popupAnchor: [0, 0] // point de position popup si elle existe, relativement à l'icône
            });

            Eol.value.forEach((nom_region) => {

                if (!(nom_region.geometry === undefined)) {


                    let position = nom_region.geometry.coordinates;
                    let libelle = nom_region.fields.s_3_prod_d_filiere;
                    let marker = Leaflet.marker([position[1], position[0]], { icon: myIcon });
                    marker.bindPopup(libelle);
                    markers.addLayer(marker);
                }
            })














            map.addLayer(markers);

            map.fitBounds(markers.getBounds)

        })
}

// Hors de onMounted
// Coordonnées de l'utilisateur
const coordMe = reactive({ latitude: 0, longitude: 0 })

// Fonction de détection de la géolocalisation via navigateur

// Fonction de sa localisation si elle réussi  
const showLocation = (position) => {
    // Récupération latitude et longitude
    coordMe.latitude = position.coords.latitude;
    coordMe.longitude = position.coords.longitude;
    // Recentrage de la carte sur la position utilisateur
    map.panTo([coordMe.latitude, coordMe.longitude])
    // Création d'un marqueur
    // L'icone ayant déjà été instancié
    // On n'a pas a le préciser, on le reprend par défaut
    let markerMe = Leaflet.marker(
        [coordMe.latitude, coordMe.longitude],
    ).addTo(map)
    // Ajout d'une infobulle
    markerMe.bindPopup("Je suis là !!!!")
}
</script>
  
<template>
    <div class="pb-20">

        <h2 class="font-bold text-2xl text-center pb-4">Carte des installations d'eolien en France</h2>
        <hr class="pb-10" />
        <div class="container pb-20">
            <select class="custom-select" v-model="Selection" @change="selection(Selection)">
                <option disabled value="0">Sélectionner un département</option>
                <option v-for="dep in liste" :key="dep.code" :value="dep.nom">
                    {{ dep.code }} - {{ dep.nom }}
                </option>
            </select>
            <div id="map">
            </div>
        </div>
    </div>
</template>
  
<style scoped>
#map {
    width: 100%;
    height: 70vh;
}
</style>