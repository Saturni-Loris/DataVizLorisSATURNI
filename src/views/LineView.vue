<script setup>
import LineChart from '../components/LineChart.vue'
import LineChart2 from '../components/LineChart2.vue'
import LineChart3 from '../components/LineChart3.vue'

</script>
<template>
    <div class="">
        <h1>La consomation d'électricité et de gaz dans le Grand-Est inquiète.</h1>
        <p class="chapo">À première vue la consommation annuelle d’électricité et gaz par an dans le Grand Est est très
            importante.
            <br>
            Comme le graphique l'indique ci-dessous, la région Grand Et a pour habitude de consommé beaucoup chaque
            années. Après son plus gros pic de consommation de gaz et d'électricité atteint en 2017 avec plus de 119 M.
            wh.
            Cette tendance commençait à prendre fin après cette année-là. De plus avec la crise du Covid-19, la
            Consommation a nettement diminué. Avec une consommation plus faible d'environ 20 MWh soit une diminution de
            13%. <br>
            Ce qui n'était plus arrivé depuis 2014 soient plus de 6 ans, comme le prouve le graphique.
        </p>

    </div>
    <LineChart />
    <div class="">
        <h1>Pourquoi cette augmentation de 2014 à 2017?</h1>
        <p class="chapo">Comme étudié en dans le graphique précédent, nous constatons une nette augmentation de
            l'énergie d'électricité et de gaz entre les années 2014 et 2017. Il est intéressant d'étudier pourquoi et
            Dans quels secteurs d'activité cette augmentation a eu lieu. Pour savoir où il est important de mettre en
            place des solutions pour réduire la consommation.
        </p>

        <p class="chapo">Grâce à plusieurs recherches, nous avons constaté que la France a connu un hiver assez doux en
            2014. C'est en principe pour cela que le taux de consommation a baissé, les Français ont moins chauffé chez
            eux. Le pourcentage de consommation résidentielle a baissé de 6% comme l'indique le graphique ci-dessous.
            <br>
            La baisse de consommation visualisée par le graphique ci-dessous est très logiquement justifiée par la crise
            due
            Cov id. Beaucoup de personnes consomment moins, car elles passent une majeure partie de leur temps chez eux.
            Pendant qu'une grande partie des entreprises est contrainte de mettre en pause leurs activité due au
            confinement.
        </p>
        <LineChart2 />
        <p class="chapo">Nous pouvons voir ci-dessus, que la consommation d'électricité et de gaz n'augmente que très
            Légèrement pour les consommations inconnues et agricoles. Avec environ 1 MWh pour les inconnus, et 0.3 MWh
            pour
            le domaine agriculture. Ces données n'augmentent pas ou très peu dans cette tranche. <br>
            Contrairement aux consommations tertiaires, qui elle augmentent beaucoup plus, d'environ 25%. Mais ces
            données
            restent acceptable, comparant à la consommation totale. 12 MWh en 2014 pour le tertiaire, et 97 MWh
            consommation
            total.<br>
            <br>
            Les données les plus importantes sont celles des secteurs résidentiels et industriels. Avec des
            augmentations
            respective de 32 MWh/an à 36 MWh/an et 51 MwH/an et 66 Mwh/an entre 2014 et 2017. Ces deux secteurs réunis
            contiennent plus de 85% de la
            Consommation totale tout secteur réuni. C'est pour ça qu'il est important de réduire ces données dans ces
            secteurs. <br>
            La mise en place des réductions de chauffages pour l'hiver 2022 est une des premières choses mises en place
            pour
            la réduction de la consommation dans le secteur résidentiel.
        </p>
    </div>

</template>