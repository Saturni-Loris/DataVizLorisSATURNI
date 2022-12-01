<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MapView from '../components/Map.vue'
</script>

<template>
    <div class="">
        <h1>Que met la région Grand Est en place pour contrer cettes pollutions ?</h1>
        <p class="chapo">Avec plus de 72 millions de Mwh d'électricité consommé en 2021 dans la région Grand Est, elle
            fait partie du top 2 des régions les plus polluantes de France après l'Ile-De-France. Cette raison vient-en
            grande partie de sa population, elle est la quatrième plus grosse région de France. Mais ici, il est
            intéressant à savoir si le Grand est met en place des solutions pour contrer cette tendance pollueuse.
            <br>
            Consultez sur la carte intégrée ci-dessous le nombre d'éoliennes installé dans chacun des départements de
            la région.
        </p>

    </div>

    <MapView class="map1" />
    <p class="auteur">Par Loris Saturni</p>
    <div class="publier">
        <p>Publié le 09 novembre 2022 à 18h20 - Temps de Lecture 5 min.</p>
    </div>
</template>