<script setup>
import { linearData, sortCol } from '@/composables/utilsTable.js'

// porpriétés de la table
const propTable = defineProps({
    title: { type: String, default: "" }, // Titre de la table
    fields: { type: Object, default: () => { } }, // Titre de la table
    items: { type: Object, default: () => { } }, // Titre de la table
    color: { type: String, default: "color:white;" } // Titre de la table
})

// Emission d'un message vers le composant parent
// Modification des données
const emit = defineEmits(['filterTab'])
const filterTab = (field) => {
    emit('tableFilter', field)
}
</script>

<template>
    <div class="container">
        <h1>{{ title }}</h1>
        <table class="table table-bordered table-striped" :style="color">
            <thead>
                <tr>
                    <th v-for="field in fields" :key='field' @click="sortCol(items, field)">
                        <div class="input-group-text w-100 mb-2">
                            <span class="col-10">{{ field.label }}</span>
                            <!--Picto de tru si colonne est triable sortable = true-->
                            <span class="col-2">
                                <i v-if="field.sortable" class="fa fa-sort fa-sm float-right
                        @click=sortCol(items, field)"></i>
                            </span>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="fa fa-filter fa-sm"></i>
                            </span>
                            <input class="form-control" @input="filterTab(field)" v-model="field.filter" />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key='item'>
                    <td v-for="field in fields" :key='field'>
                        <span>{{ item[field.key] }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script scoped>

</script>