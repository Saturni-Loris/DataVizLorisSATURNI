<script setup>
// Import des éléments utiles de vue
import { reactive, ref, onMounted } from 'vue';

// Import d'un graphique type doughnut
import { PolarArea } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale)


// Propriétés du graphique Utilisés dans le template (props)
// On définit pour chacune son type de données et sa valeur par défaut
// On peut utiliser une grande variété de types, voire des objets
const propChart = defineProps({
    chartId: { type: String, default: 'doughnut-chart' }, // Id du graphique
    datasetIdKey: { type: String, default: 'label' }, // id du dataSet
    width: { type: Number, default: 100 }, // Largeur du graphe
    height: { type: Number, default: 40 }, // Hauteur du graphe
    cssClasses: { type: String, default: '' }, // Classes css utilisées
    styles: { type: Object, default: () => { } }, // Styles utilisés
    plugins: { type: Object, default: () => { } }  // plugins utilisés
});

// Données du graphe
// Pour l'instant juste pour tester le fonctionnement
const chartData = reactive({
    // Les éléments sont au départ à vide
    labels: [],
    datasets: [
        {
            data: [],
            backgroundColor: [
                'rgba(0, 0, 255)',
                'rgba(121, 248, 248)',
                'rgba(0, 127, 255)',
                'rgba(30, 127, 203)',
                'rgba(116, 208, 241)',
                'rgba(53, 122, 183)',
                'rgba(34, 66, 124)',
                'rgba(36, 68, 92)',
                'rgba(49, 140, 231)',
                'rgba(15, 157, 232)',

            ],
            borderColor: [],
            borderWidth: 0
        }
    ]
});


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
            text: "Consomation dans le secteur de l'industrit dans la région Grand-Est entre 2011 et 2021 (en MWh)",
            // Police du texte
            font: {
                size: 16
            }
        }
    }

});
// Options du graphe


// Utilisation d'une ref pour requête Ajax
// null au départ (important)
let liste = ref();


// Au montage du composant
onMounted(async () => {

    let request = "https://opendata.agenceore.fr/api/records/1.0/search/?dataset=conso-elec-gaz-annuelle-par-secteur-dactivite-agregee-commune&q=&facet=operateur&facet=annee&facet=filiere&facet=libelle_commune&facet=code_departement&facet=libelle_region&facet=code_postal&refine.libelle_region=Grand+Est"
        + "&q=&rows=8000"

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
                setLabels.add(el.fields.libelle_departement)
            })
            // Transmission des valeurs du set aux labels 
            chartData.labels = Array.from(setLabels)
            // Tri des labels par ordre croissant
            chartData.labels.sort()

            let cptf = []
            let cpt = [];
            // Comptage pour hommes

            // Parcours des labels
            chartData.labels.forEach((label) => {
                // Parcours des données
                // Compteurs pour un labels
                let nbf = 0

                // Parcours des valeurs
                liste.value[0].records.forEach((el) => {
                    // Si c'est le bon label
                    if (label == el.fields.libelle_departement) {
                        // Comptage des valeurs
                        nbf += el.fields.consoi

                    }
                })
                // Mise à jour des tableaux
                cptf.push(nbf)
            })
            // On transfert le tableau de comptage dans les data 
            chartData.datasets[0].data = cpt;

            // Calcul des couleurs et bordures
            let bgColor = [];
            let bdColor = [];
            // Pour chaque valeur existante            
            cpt.forEach(function (val) {
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

            chartData.datasets[0].data = cptf
            chartData.datasets[2].backgroundColor = bgColor;
            chartData.datasets[0].borderColor = bdColor;
        })
        .catch(error => console.log('erreur Ajax', error))
})

// Fonction de calcul aléatoire des couleurs
const couleur = (min, max) => {
    return Math.floor(Math.random() * (max - min));
}
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
        <PolarArea :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
            :height="height" />
    </div>
</template>

<style scoped>
.container {
    width: 70%;
    height: 70%;
    margin: auto;
}
</style>

    