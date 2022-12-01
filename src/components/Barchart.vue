<script setup>
import { reactive, ref, onMounted } from 'vue';
// Import d'un graphique type barChart
import { Bar } from 'vue-chartjs'

// Import des objets du graphique de la bibliothèque ChartJs
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// Eléments utilisés par notre graphique
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


// Propriétés du graphique Utilisés dans le template (props)
// On définit pour chacune son type de données et sa valeur par défaut
// On peut utiliser une grande variété de types, voire des objets
const propChart = defineProps({
    chartId: { type: String, default: 'bar-chart' }, // Id du graphique
    datasetIdKey: { type: String, default: 'label' }, // id du dataSet
    width: { type: Number, default: 350 }, // Largeur du graphe
    height: { type: Number, default: 700 }, // Hauteur du graphe
    cssClasses: { type: String, default: '' }, // Classes css utilisées
    styles: { type: Object, default: () => { } }, // Styles utilisés
    plugins: { type: Object, default: () => { } }  // plugins utilisés
})

// Données injectées dans le graphique
let chartData = reactive({
    // Etiquettes l'axe 
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    // Valeurs des données du graphique
    datasets: [{
        // Etiquette du jeu de données à projeter
        label: '',
        // Valeurs des données (statiques pour l'exemple)
        data: [40, 20, 12, 14, 24],
        // Couleur de la barra affectée à chaque valeur
        backgroundColor: [
            'rgba(165, 38, 10)',
            'rgba(107, 13, 13)',
            'rgba(150, 0, 24)',
            'rgba(150, 0, 24)',
            'rgba(247, 35, 12)',
            'rgba(214, 76, 1)',
            'rgba(96, 47, 3)',
            'rgba(255, 0, 0)',
            'rgba(255, 160, 122)',
            'rgba(250, 128, 114)',
            'rgba(233, 150, 122)',
            'rgba(240, 128, 128)',
            'rgba(205, 92, 92)',
            'rgba(220, 20, 60)',
            'rgba(178, 34, 34)',
            'rgba(139, 0, 0)',


        ],
        // Couleur de la bordure affectée à chaque valur
        borderColor: [

        ],
        // Epaisseur de la bordure
        borderWidth: 0
    }]
});

// Options du graphique
// Les principales utilisées, ils en existe beaucoup d'autres
// voir documentation
let chartOptions = reactive({
    // Aspect responsive du graphique
    responsive: true,

    // Maintenir ou non l'aspect du graphique
    maintainAspectRatio: false,

    // type de projetction utilisée :
    // x: verticale
    // y : horizontale
    indexAxis: 'x',

    // Echelles du graphique
    // Valeurs maximales des axes
    scales: {
        // axe des ordonnées
        y: {
            // Valeur max des y fixées à 100
            suggestedMax: 100,
            // graduation de l'axe y
            ticks: {
                // Police
                font: {
                    size: 11
                }
            }
        },
        // axe des abscisses
        x: {
            // graduation de l'axe x
            ticks: {
                // Police
                font: {
                    size: 12
                }
            }
        }
    },

    // Les plugins
    plugins: {
        // Lengende des données
        legend: {
            // Label des données
            labels: {
                color: "",
                font: {
                    size: 16
                }
            },
        },
        // Titre du graphique      
        title: {
            // Affichage
            display: true,
            // Libellé du graphique
            text: "Consommation d'électricité et de gaz des régions de France en MWh en axe Y et régions en X (2011 - 2021)",
            // Police du texte
            font: {
                size: 16
            }
        }

    }
});


let liste = ref()
onMounted(async () => {

    let request = "https://opendata.agenceore.fr/api/records/1.0/search/?dataset=conso-elec-gaz-annuelle-par-secteur-dactivite-agregee-region&q=&"
        + "&q=&rows=1000"



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
                setLabels.add(el.fields.libelle_region)
            })
            // Transmission des valeurs du set aux labels 
            chartData.labels = Array.from(setLabels)
            // Tri des labels par ordre croissant
            chartData.labels.sort()

            let cptf = []
            // Comptage pour hommes

            // Parcours des labels
            chartData.labels.forEach((label) => {
                // Parcours des données
                // Compteurs pour un labels
                let nbf = 0

                // Parcours des valeurs
                liste.value[0].records.forEach((el) => {
                    // Si c'est le bon label
                    if (label == el.fields.libelle_region) {
                        // Comptage des valeurs
                        nbf += el.fields.consototale

                    }
                })
                // Mise à jour des tableaux
                cptf.push(nbf)

            })
            // chargement des données
            chartData.datasets[0].data = cptf


        })
        .catch(error => console.log('erreur Ajax', error))
})

</script>

<template>
    <div class="container">
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
        <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
            :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
    </div>

</template>