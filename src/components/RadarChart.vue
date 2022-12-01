<script setup>
import { reactive, ref, onMounted } from 'vue';

// Import d'un graphique type radar
import { Radar } from 'vue-chartjs'

// Import des objets du graphique de la bibliothèque ChartJs
// Voir documentation pour descriptif des éléments
import {
    Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement,
    RadialLinearScale, Filler
} from 'chart.js'

// Eléments utilisés par notre graphique registration pour Vue-chart
ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement,
    RadialLinearScale, Filler)


// Propriétés du graphique Utilisés dans le template (props)
// On définit pour chacune son type de données et sa valeur par défaut
// On peut utiliser une grande variété de types, voire des objets
const propChart = defineProps({
    chartId: { type: String, default: 'radar-chart' }, // Id du graphique
    datasetIdKey: { type: String, default: 'label' }, // id du dataSet
    width: { type: Number, default: 500 }, // Hauteur du graphe
    height: { type: Number, default: 500 }, // Largeur du graphe
    cssClasses: { type: String, default: '' }, // Classes css utilisées
    styles: { type: Object, default: () => { } }, // Styles utilisés
    plugins: { type: Object, default: () => { } }  // plugins utilisés
})


// Données du graphe
// Pour l'instant juste pour tester le fonctionnement
const chartData = reactive({
    // Les éléments sont au départ à vide
    labels: [],
    datasets: [
        {
            data: [],
            label: "Installation hydraulique",
            backgroundColor: [
                'rgba(24,100,150)',
            ],
            borderColor: [],
            borderWidth: 1
        }
    ]
})

// Options du graphe
const chartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        // Titre du graphique      
        title: {
            // Affichage
            display: true,
            // Libellé du graphique
            text: "Nombre d'installation hydraulique selon les années dans le Grand Est. Entre 2017 et 2021",
            // Police du texte
            font: {
                size: 16
            }
        }
    }
})

// Utilisation d'une ref pour requête Ajax
// null au départ (important)
let liste = ref()
onMounted(async () => {

    let request = 'https://opendata.agenceore.fr/api/records/1.0/search/?dataset=installations-de-production-hydraulique-par-commune&q=&refine.nom_reg=Grand+Est'
        + "&q=&rows=10000"


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
                setLabels.add(el.fields.date_des_donnees)
            })
            // Transmission des valeurs du set aux labels 
            chartData.labels = Array.from(setLabels)
            // Tri des labels par ordre croissant
            chartData.labels.sort()

            let cpte = []
            let cptg = []
            // Comptage pour hommes

            // Parcours des labels
            chartData.labels.forEach((label) => {
                // Parcours des données
                // Compteurs pour un labels
                let nbe = 0
                let nbg = 0

                // Parcours des valeurs
                liste.value[0].records.forEach((el) => {
                    // Si c'est le bon label
                    if (label == el.fields.date_des_donnees) {
                        // Comptage des valeurs
                        nbe += el.fields.count
                        nbg += el.fields.count

                    }
                })
                // Mise à jour des tableaux
                cpte.push(nbe)
                cptg.push(nbg)

            })
            // chargement des données
            chartData.datasets[0].data = cpte
            chartData.datasets[1].data = cptg

            let bgColor = [];
            let bdColor = [];
            // Pour chaque valeur existante            
            cpte.forEach(function (val) {
                // On calcul la couleur du secteur
                let c1 = couleur(0, 255)
                let c2 = couleur(0, 255)
                let c3 = couleur(0, 255)
                let tr = 0.5
                // Couleur avec transparence
                let color = 'rgba(' + [c1, c2, c3, tr].join(',') + ")"
                bgColor.push(color)
                // Bordure sans transparence
                let border = 'rgba(' + [c1, c2, c3].join(',') + ")"
                bdColor.push(color)
            })
            // Chargement des couleurs et des bordures
            let elemSupp = [];
            let labelSupp = [];
            let labelElemSupp = [];
            let i = 0;
            chartData.datasets[0].data.forEach((date_des_donnees) => {
                if (date_des_donnees < 1000000000) {
                    elemSupp.push(date_des_donnees);
                    labelSupp.push(chartData.datasets[0].data.indexOf(date_des_donnees, i));
                }
                i = i + 1;
            });
            console.log("elem a supp", elemSupp);
            console.log("label a supp", labelSupp);
            elemSupp.forEach((el) => {
                removeItemAll(chartData.datasets[0].data, el);
            });
            labelSupp.forEach((label) => {
                labelElemSupp.push(chartData.labels[label]);
            });
            labelElemSupp.forEach((el) => {
                removeItemAll(chartData.labels, el);
            });
            chartData.datasets[0].backgroundColor = bgColor;
            chartData.datasets[0].borderColor = bdColor;



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
        <Radar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
            :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>