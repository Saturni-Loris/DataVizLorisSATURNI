<script setup>
import { onMounted, ref, reactive } from 'vue'
import * as Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

let tileLayer = Leaflet.tileLayer
let map = ref()

onMounted(async () => {

    // Caractéristiques visuelle de la carte
    tileLayer = Leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
    );

    map = Leaflet.map('map',
        {
            zoomControl: true,
            layers: [tileLayer],
            maxZoom: 18,
            minZoom: 6
        })

        .setView([48.2260139, 6.2093292], 13)

    let myIcon = Leaflet.icon({
        iconUrl: '../../public/images/marker-icon.png',
        shadowUrl: '../../public/images/marker-shadow.png',
        iconSize: [25, 41],
        shadowSize: [25, 41],
        iconAnchor: [-10, -10],
        popupAnchor: [0, 0]
    });

    let marker = Leaflet.marker([48.2260139, 6.2093292], { icon: myIcon }).addTo(map)

    marker.bindPopup("Ville de Dompaire (La ligne d'éolienne se situe entre ces deux makers)")

    setTimeout(function () {
        map.panTo([48.1667988, 6.1816135])
    }, 1000);

    let marker2 = Leaflet.marker(
        [48.1667988, 6.1816135],
        { icon: myIcon }
    ).addTo(map)
    marker2.bindPopup("Ville de Ville-sur-Illon (La ligne d'éolienne se situe entre ces deux makers)")
})

const coordMe = reactive({ latitude: 0, longitude: 0 })
const locMe = () => {
    let watcher = navigator.geolocation.watchPosition(
        showLocation
    )
}

const showLocation = (position) => {
    coordMe.latitude = position.coords.latitude;
    coordMe.longitude = position.coords.longitude;

    map.panTo([coordMe.latitude, coordMe.longitude])

    let markerMe = Leaflet.marker(
        [coordMe.latitude, coordMe.longitude],
    ).addTo(map)

    markerMe.bindPopup("Vous êtes ici")
}

</script>

<template>
    <div>
        <div class="selocaliser">
            <p>Trouver l'un des plus grands parc d'éoliennes du Grand-Est'</p>
            <button class="loca" type="button" @click="locMe()">LOCALISER</button>
        </div>
        <div class="container">
            <div id="map"></div>
        </div>
    </div>
</template>

<style scoped>

</style>