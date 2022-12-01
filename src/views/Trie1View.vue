<script setup>
import { ref, reactive, onMounted } from 'vue';

import { getConso } from '@/composables/serviceAjax.js'

let items = ref()
let itemsAll = ref()
let fields = ref()
let field = ref()
fields.value = [

    { key: 'nom_reg', label: "Nom région", type: "text", sortable: true, sort: 1, filter: "" },
    { key: 'dep', label: "Code département", type: "text", sortable: true, sort: 1, filter: "" },
    { key: 'nom_dept', label: "Nom région", type: "text", sortable: true, sort: 1, filter: "" },
    { key: 'date_des_donnees', label: "Date des données", type: "date", sortable: true, sort: 1, filter: "" },
    { key: 'coordonnees', label: "Coordonnees", type: "text", sortable: true, sort: 1, filter: "" },

]

// Au montage de la vue
onMounted(async () => {
    await getConso()
        .then(response => {
            items.value = response;

            fields.value.forEach((field) => {
                let t = field.key.split(".")
                let lg = t.length

                items.value.forEach((item) => {
                    // Niveau 1
                    if (lg == 1) {
                        if (Array.isArray(item[field.key])) { // si tableau
                            let value = ''
                            item[field.key].forEach((val) => { value += " " + val })
                            item[field.key] = value
                        } else {
                            // Sinon rien valeur prise par défaut
                        }
                    }
                    if (lg == 2) {
                        if (Array.isArray(item[t[0]])) { // si tableau
                            let value = ''
                            item[t[0]].forEach((val) => { value += " " + val[t[1]] })
                            item[field.key] = value
                        } else { item[field.key] = item[t[0]][t[1]] }
                    }
                    // Niveau 3
                    if (lg == 3) {
                        if (Array.isArray(item[t[0]][t[1]])) { // si tableau
                            let value = ''
                            item[t[0]][t[1]].forEach((val) => { value += " " + val[t[2]] })
                            item[field.key] = value
                        } else { item[field.key] = item[t[0]][t[1]][t[2]] }
                    }
                    // etc
                })
            })
            // Mémoriser la liste dans le cadre des filtrages
            itemsAll.value = items.value
        })
        .catch(error => console.log('erreur Ajax', error))
})

// tri sélectionné
const sortCol = (items, field) => {
    const compareString = (a, b) => {
        return a[field.key].toLowerCase() > b[field.key].toLowerCase() ? 1 * field.sort : -1 * field.sort
    }
    // Fonctions de comparaison numérique
    const compareNumber = (a, b) => {
        // type number demandé, on fait une conversion en réel, si chiffre à virgule
        return parseFloat(a[field.key]) > parseFloat(b[field.key]) ? 1 * field.sort : -1 * field.sort
    }

    // Suivant le type de tri
    if (field.type == 'number') { items = items.sort(compareNumber) }
    else { items = items.sort(compareString) }

    // position du tri à l'inverse de ce qu'il est
    // pour le prochain click
    field.sort = field.sort * -1
}

const tableFilter = (field) => {
    items.value = itemsAll.value.filter((villageois) => {
        return villageois[field.key].toLowerCase().includes(field.filter.toLowerCase())
    })
}
</script>

<template>
    <div class="container-fluid fondBlanc">
        <h1 class="text-dark"></h1>
        <div class="card">
            <h5 class="card-title text-dark">Filtrages</h5>
        </div>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th v-for="field in fields" :key='field'>
                        <div class="input-group-text w-100 mb-2">
                            <span class="col-10">
                                {{ field.label }}
                            </span>
                            <!--- Picto de tri si la colonne est triable sortable = true -->
                            <span class="col-2">
                                <i v-if="field.sortable" class="fa fa-sort float-right"
                                    @click="sortCol(items, field)"></i>
                            </span>
                        </div>
                        <div class="input-group">
                            <!-- Picto filtrage-->
                            <span class="input-group-text">
                                <i class="fa fa-filter fa-sm"></i>
                            </span>
                            <input class="form-control" @input="tableFilter(field)" v-model="field.filter" />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="item in items" :key='item'>
                    <td v-for="field in fields" :key='field'>
                        {{ item[field.key] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

</style>