<script setup>
import { reactive, ref, onMounted } from 'vue';
import { Radar } from 'vue-chartjs'
import {
    Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement,
    RadialLinearScale, Filler
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement,
    RadialLinearScale, Filler)

const propChart = defineProps({
    chartId: { type: String, default: 'radar-chart' },
    datasetIdKey: { type: String, default: 'label' },
    width: { type: Number, default: 500 },
    height: { type: Number, default: 500 },
    cssClasses: { type: String, default: '' },
    styles: { type: Object, default: () => { } },
    plugins: { type: Object, default: () => { } }
})


const chartData = reactive({
    labels: [],
    datasets: [
        {
            data: [],
            label: "Installation d'éolienne",
            backgroundColor: [
                'rgba(240,215,190)',
            ],
            borderColor: [],
            borderWidth: 1
        }

    ]

})

const chartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        // Titre du graphique      
        title: {
            // Affichage
            display: true,
            // Libellé du graphique
            text: "Nombre d'installation d'éolienne selon les années dans le Grand Est. Entre 2017 et 2021",
            // Police du texte
            font: {
                size: 16
            }
        }
    }
})

let liste = ref()
onMounted(async () => {

    let request = 'https://opendata.agenceore.fr/api/records/1.0/search/?dataset=installations-de-production-eolien-par-commune&q=&refine.nom_reg=Grand+Est'
        + "&q=&rows=7000"


    await fetch(request)
        .then(response => response.json())
        .then(response => {
            liste.value = new Array(response);
            console.log("response", liste.value);
            let setLabels = new Set()
            liste.value[0].records.forEach((el) => {
                setLabels.add(el.fields.date_des_donnees)
            })
            chartData.labels = Array.from(setLabels)
            chartData.labels.sort()
            let cpte = []
            let cptg = []
            chartData.labels.forEach((label) => {
                let nbe = 0
                let nbg = 0
                liste.value[0].records.forEach((el) => {
                    if (label == el.fields.date_des_donnees) {
                        nbe += el.fields.count
                        nbg += el.fields.count

                    }
                })
                cpte.push(nbe)
                cptg.push(nbg)
            })
            chartData.datasets[0].data = cpte
            chartData.datasets[1].data = cptg
            let bgColor = [];
            let bdColor = [];
            cpte.forEach(function (val) {
                let c1 = couleur(0, 255)
                let c2 = couleur(0, 255)
                let c3 = couleur(0, 255)
                let tr = 0.5
                let color = 'rgba(' + [c1, c2, c3, tr].join(',') + ")"
                bgColor.push(color)
                let border = 'rgba(' + [c1, c2, c3].join(',') + ")"
                bdColor.push(color)
            })
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