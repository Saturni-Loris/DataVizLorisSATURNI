<script setup>
import PolarView from '../components/Polar.vue';</script>

<template>
    <main>
        <div class="">
            <h1>Consommation dans le secteur de l'industrie dans la région Grand Est</h1>
            <p class="chapo">Comme nous l'avons vu dans le graphique "Line Chart: la consommation d'électricité et de
                gaz
                dans le Grand Est". C'est le secteur de l'industrie qui consomme le plus d'électricité et de gaz dans
                cette région. Il
                serait donc intéressant de chercher à mettre des solutions en place dans ce secteur. <br>
                Pour ne pas investir maladroitement dans du matériel tel que de l'éolien ou de l'hydraulique qui coute
                chère. Il faut tout d'abord savoir quel sont les meilleurs départements où investir. Car un département
                comme la Meuse, qui consomme très peu compare au Haut-Rhin. Respectivement 800 000 MWh contre 10 000 000
                MWh par an.
                <br>
                Nous voyons donc qu'il est intéressant de mettre des solutions en place dans des départements ou la
                Consommation d'énergie dans l'industrie est très importante, comme la Moselle ou le Haut-Rhin.
            </p>
            <p class="chapo">La couleur bleu est utilisé ici afin de se rapprocher de la couleur du logo bleu du Grand
                Est. De plus, étant toutes des données du même département, il y a une cohérence dans ces informations,
                c'est donc important de mettre une couleur se rapprochant.
            </p>
        </div>
        <PolarView />
    </main>
</template>

<style scoped>

</style>