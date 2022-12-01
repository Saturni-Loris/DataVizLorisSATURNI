<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Map from './components/Map.vue'
</script>

<template>

  <header>

    <div>
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/cartes">Cartes</RouterLink>
        <RouterLink to="/graphiques">Graphiques</RouterLink>

      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
