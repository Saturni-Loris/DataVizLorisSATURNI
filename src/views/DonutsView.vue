<script setup>
import DonutsChart from '../components/DonutsChart.vue';</script>

<template>
    <main>
        <div>
            <h1>Le Grand Est, une des plus grandes régions de France: la consommation électrique de la région est-elle
                proportionnelle a
                sa taille ?</h1>
            <p class="chapo">La région grand est est une des plus grandes régions de France, avec plus de 57 000 km² de
                superficie et 5 000 000
                d’habitants, elle est la 4ème plus grande région du pays. Présidé par Jean Rottner, depuis 2017, nous
                nous
                attendons
                qu’une région si grande en population et superficie possède une consommation électrique et gaz très
                importante.
                Mais
                qu’en est-il vraiment, est-ce qu’une région si grande doit-elle obligatoirement polluer à cause de ça
                taille ? <br>
                En analysant certaines données, nous pourrons savoir si la consommation d'énergie de la région est en
                accord avec
                sa taille ou pas.
            </p>
            <p class="chapo">Étant deux données bien différentes, il faut mettre des couleurs qui se démarque, pour ne
                pas confondre les représentations. La couleur bleu représente l'électricité, et la couleur gris claire
                le gaz.
            </p>
        </div>
        <DonutsChart class="donuts" />
    </main>
</template>

<style scoped>

</style>