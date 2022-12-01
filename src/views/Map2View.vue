<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Map2View from '../components/Map2.vue'
</script>

<template>
    <div class="">
        <h1>Visite d'éolienne</h1>
        <p class="chapo">Les phénomènes bien qu'existants depuis plus de 50 ans, encore beaucoup de personnes n'en
            jamais vu, entendu parler, où connaisse leur fonctionnement. Mais il n'est jamais trop tard, profitez d'un
            Larges panels d'éoliennes à découvrir au plus grand parc éolien des Vosges.<br>
            Avec 18 éoliennes placées entre les villes de Dompaire et de Ville-sur-Illon est un des plus grands parcs à
            éolienne du Grand Est.<br>
            Produisant l'équivalent des besoins en énergie de plus de 36 000 habitants. Visitez dès aujourd'hui ce parc
            !
        </p>

    </div>

    <Map2View class="map1" />
    <p class="auteur">Par Loris Saturni</p>
    <div class="publier">
        <p>Publié le 09 novembre 2022 à 18h20 - Temps de Lecture 5 min.</p>
    </div>
</template>