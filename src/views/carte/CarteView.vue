<script setup>
</script>

<template>
    <main>
        <div>
            <h1>Cartes</h1>
            <p class="chapo">Naviguer ci-dessous afin de découvrir nos cartes:
            </p>
        </div>
        <div class="routerlink">
            <RouterLink to="/map">Les éoliennes dans le Grand Est</RouterLink>
            <RouterLink to="/map2">Une éolienne proche de chez vous ?</RouterLink>
        </div>
        <div>
            <img src="../../../public/img/eolienne.jpg"
                alt="image de la carte du grand est avec les eoliennes indiqués">
        </div>
    </main>
</template>

<style scoped>

</style>