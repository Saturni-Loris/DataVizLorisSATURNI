<script setup>
import { reactive, ref, onMounted } from 'vue';

// Import d'un graphique typeLineChart
import { Line } from 'vue-chartjs'

// Import des objets du graphique de la bibliothèque ChartJs
// Voir documentation pour descriptif des éléments
import {
    Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement,
    LineController, CategoryScale, LinearScale, Filler
} from 'chart.js'

// Eléments utilisés par notre graphique registration pour Vue-chart
ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement,
    LineController, CategoryScale, LinearScale, Filler)


// Propriétés du graphique Utilisés dans le template (props)
// On définit pour chacune son type de données et sa valeur par défaut
// On peut utiliser une grande variété de types, voire des objets
const propChart = defineProps({
    chartId: { type: String, default: 'line-chart' }, // Id du graphique
    datasetIdKey: { type: String, default: 'label' }, // id du dataSet
    width: { type: Number, default: 100 }, // Hauteur du graphe
    height: { type: Number, default: 40 }, // Largeur du graphe
    cssClasses: { type: String, default: '' }, // Classes css utilisées
    styles: { type: Object, default: () => { } }, // Styles utilisés
    plugins: { type: Object, default: () => { } }  // plugins utilisés
})

// Données injectées dans le graphique
let chartData = reactive({
    // Etiquettes l'axe 
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    // Valeurs des données du graphique
    // 3 datasets, en un premier temps les données sont statiques (jeux de test)
    // Elles seront écrasées par les données réelles provenant de l'API
    datasets: [
        {
            // Etiquette du jeu de données à projeter
            label: 'Consomation tertiaire',
            // Valeurs des données (statiques pour l'exemple)
            data: [40, 20, 12, 14, 24],
            borderColor: 'rgba(255, 0, 0, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Consomation agricole',
            // Valeurs des données (statiques pour l'exemple)
            data: [40, 20, 12, 14, 24],
            borderColor: 'rgba(255, 255, 0, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Consomation industrielle',
            // Valeurs des données (statiques pour l'exemple)
            data: [40, 1, 1, 14, 24],
            borderColor: 'rgba(200, 100, 255, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Consomation résidientiel',
            // Valeurs des données (statiques pour l'exemple)
            data: [40, 1, 1, 14, 24],
            borderColor: 'rgba(0, 155, 15, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Consomation inconnu',
            // Valeurs des données (statiques pour l'exemple)
            data: [40, 1, 1, 14, 24],
            borderColor: 'rgba(0, 0, 255, 0.5)',
            tension: 0.5,
            fill: true
        },


    ]
});

// Options du graphique
// Les principales utilisées, ils en existe beaucoup d'autres
// voir documentation
let chartOptions = reactive({
    // Aspect responsive du graphique
    responsive: true,
    // Les plugins
    plugins: {
        // Titre du graphique      
        title: {
            // Affichage
            display: true,
            // Libellé du graphique
            text: "Consommation d'électricité et de gaz réunni dans le Grand-Est (triés par secteur)",
            // Police du texte
            font: {
                size: 16
            }
        }
    }

});


// Montage du composant Chargement des données
// Liste contiendra le résultat de la requête
let liste = ref()
onMounted(async () => {

    let request = "https://opendata.agenceore.fr/api/records/1.0/search/?dataset=conso-elec-gaz-annuelle-par-secteur-dactivite-agregee-region&q=&refine.libelle_region=Grand+Est"
        + "&q=&rows=900"
        + "&sort=-annee"
        + "&refine.etablissement_type=consot"
        + "&refine.etablissement_type=consoa"
        + "&refine.etablissement_type=consoi"


    await fetch(request)
        // Réponse demandée en json
        .then(response => response.json())
        // récupération de la réponse
        .then(response => {
            liste.value = new Array(response);
            // On vérifie dans la consle l'obtention des résultats
            console.log("response", liste.value);
            // Récupération du nombres de valeurs retournées
            // Chargement des labels (axe des ordonnées)
            // Création d'un set pour valeurs uniques
            let setLabels = new Set()
            // Parcours des valeurs , récupération des années
            liste.value[0].records.forEach((el) => {
                setLabels.add(el.fields.annee)
            })
            // Transmission des valeurs du set aux labels 
            chartData.labels = Array.from(setLabels)
            // Tri des labels par ordre croissant
            chartData.labels.sort()

            // Calcul des valeurs par labels
            // Comptage pour tertiaire
            let cptt = []
            // Comptage pour agricole 
            let cpta = []
            // comptage industrie

            let cpti = []
            //comptage inconnue
            let cptn = []
            //comptatge residence
            let cptr = []
            // Parcours des labels
            chartData.labels.forEach((label) => {
                // Parcours des données
                // Compteurs pour un labels
                let nbt = 0
                let nba = 0
                let nbi = 0
                let nbr = 0
                let nbn = 0

                // Parcours des valeurs
                liste.value[0].records.forEach((el) => {
                    // Si c'est le bon label
                    if (label == el.fields.annee) {
                        // Comptage des valeurs
                        nbt += el.fields.consot
                        nba += el.fields.consoa
                        nbi += el.fields.consoi
                        nbr += el.fields.consor
                        nbn += el.fields.consona

                    }
                })
                // Mise à jour des tableaux
                cptt.push(nbt)
                cpta.push(nba)
                cpti.push(nbi)
                cptr.push(nbr)
                cptn.push(nbn)
            })
            // chargement des données
            chartData.datasets[0].data = cptt
            chartData.datasets[1].data = cpta
            chartData.datasets[2].data = cpti
            chartData.datasets[3].data = cptr
            chartData.datasets[4].data = cptn

        })
        .catch(error => console.log('erreur Ajax', error))
})
</script>

<template>
    <!-- 
        chart-options : Options du graphique
        chart-data : données du graphique
        chart-id : Identifiant du graphique
        dataset-id-key : Identifiant des données
        plugins : plugins utilisés
        css-classes : Classes css utilisées
        styles : styles css utilisés
        width : largeur du graphique
        height : hauteur du graphique
    -->
    <Line :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>