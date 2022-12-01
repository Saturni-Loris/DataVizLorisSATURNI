<script setup>
</script>

<template>
    <main>
        <div>
            <h1>Graphiques</h1>
            <p class="chapo">Naviguer ci-dessous afin de découvrir nos graphiques:
            </p>
        </div>
        <div class="routerlink">
            <div class="lien">
                <RouterLink to="/barchart1">Barchart: Consommation d'électricité et de gaz des régions de France
                </RouterLink>
            </div>
            <div class="lien">
                <RouterLink to="/line">Line Chart: La consommation d'électricité et de gaz dans le Grand Est
                </RouterLink>
            </div>
            <div class="lien">
                <RouterLink to="/radar">Radar: Nombre d'installations hydraulique et éolienne par année</RouterLink>
            </div>

            <div class="lien">
                <RouterLink to="/donuts">Donuts: Comparaison de consommation d'électricité et de gaz</RouterLink>
            </div>
            <div class="lien">
                <RouterLink to="/pie">Pie: Comparaison de consommation d'électricité et de gaz</RouterLink>
            </div>
            <div class="lien">
                <RouterLink to="/polar">Polar: Consommation dans le secteur de l'industrie dans les départements
                    Grand Est </RouterLink>
            </div>
            <div class="lien">
                <RouterLink to="/trie1">Trie: </RouterLink>
            </div>
        </div>

    </main>
</template>

<style scoped>
.lien {
    padding: 16px;
}
</style>

