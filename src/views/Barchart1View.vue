<script setup>
import BarChart from '../components/Barchart.vue';</script>

<template>
    <main>
        <h1>Consommation d'électricité et de gaz des régions de France</h1>
        <p class="chapo">Nous devons tout d'abord savoir sur quoi nous-effectuons nos graphiques et pourquoi. Notre but
            ici est de réduire la consommation d'électricité et de gaz de la région Grand Est.
            Si nous voulons nous concentrer sur le Grand Est, il est important d'en connaître également sur d'autres
            régions. Car si la région possède déjà un taux de consommation très faible, par rapport à d'autres, il
            serait
            s'en doute plus judicieux de mettre en place des moyens pour d'autres régions.

        </p>
        <p class="chapo">Nous constatons sur la représentation ci-dessous, que le Grand Est est une des 4 villes qui
            consomment le plus dû à sa taille et son nombre d'habitants. Il serait donc intéressant de pousser nos
            recherches sur ce département afin de savoir ce que nous pouvons y modifier pour réduire cet impact.
        </p>

        <p class="chapo">Étant les mêmes région de la France, il est intéressant de mettre en place les mêmes couleurs
            pour créer une unilaritée. De plus le rouge représente la couleur de la France.
        </p>
        <BarChart />
    </main>
</template>

<style scoped>

</style>