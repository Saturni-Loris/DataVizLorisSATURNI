import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import Barchart1View from '../views/Barchart1View.vue'
import RadarView from '../views/Radar1View.vue'
import Map2View from '../views/Map2View.vue'
import LineView from '../views/LineView.vue'
import DonutsChartView from '../views/DonutsView.vue'
import PieView from '../views/PieView.vue'
import CarteView from '../views/carte/CarteView.vue'
import GraphiqueView from '../views/GraphiqueView.vue'
import PolarView from '../views/PolarView.vue'
import Trie1View from '../views/Trie1View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/trie1',
      name: 'trie1',
      component: Trie1View
    },
    {
      path: '/polar',
      name: 'polar',
      component: PolarView
    },
    {
      path: '/graphiques',
      name: 'graphiques',
      component: GraphiqueView
    },
    {
      path: '/cartes',
      name: 'cartes',
      component: CarteView
    },
    {
      path: '/pie',
      name: 'pie',
      component: PieView
    },
    {
      path: '/line',
      name: 'line',
      component: LineView
    },
    {
      path: '/donuts',
      name: 'donuts',
      component: DonutsChartView
    },
    {
      path: '/map2',
      name: 'map2',
      component: Map2View
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/barchart1',
      name: 'barchart1',
      component: Barchart1View
    },
    {
      path: '/radar',
      name: 'radar',
      component: RadarView
    },


  ]
})

export default router
