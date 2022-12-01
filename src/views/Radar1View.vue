<script setup>
import RadarChart from '../components/RadarChart.vue';
import RadarChart2 from '../components/RadarChart2.vue';</script>
<template>
    <main>
        <h1>Nombre d'installations hydrauliques par année dans le Grand Est</h1>
        <p class="chapo">
            Ce qui est très intéressant à constater dans le graphique radar ci-dessous, ce sont les mois et années. En
            effet, on peut voir que les installations hydrauliques augmentent de chaque année plus en plus. <br>
            Mais l'année la plus importante à constater est celle de 2021. Car si pour toutes les données;
            s'arrête à la fin de l'année avec le mois 12 de décembre inscrit à côté de l'année. L'année 2021 s'arrête en
            juillet, et comtabilise déjà 346 installations. Ce qui prouve une très grande avance, et une nette
            progréssion sur les années précédentes. </p>
        <RadarChart />

        <h1>Nombre d'installation d'éolienne par année dans le Grand-Est</h1>
        <p class="chapo">
            Après l'augmentation de pose d'installation hydraulique en 2018 et 2019. Le Grand Est subit une grande
            diminution d'installation d'environ 10%. Très certainement dû à la crise du Covid-19. Mais nous voyons que;
            comme dans le graphique précédent, l'année 2021 n'est qu'au mois de juillet, et est pourtant très avancée.
            Avec déjà 406 installations.
        </p>
        <RadarChart2 />
    </main>
</template>

<style scoped>

</style>