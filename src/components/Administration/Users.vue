<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-autocomplete dense filled placeholder="Select organization" label="Organization"></v-autocomplete>
      </v-col>
      <v-col cols="3">
        <v-autocomplete dense filled placeholder="Search by user or email" label="User"></v-autocomplete>
      </v-col>
      <v-col cols="3">
        <v-btn class="mt-2" block color="primary">Search</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <FwTable :loading="loadingTableState"></FwTable>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import FwTable from "@/components/DataTable/FwTable.vue";
import {onMounted} from "vue";
import {ref, type Ref} from "vue";

const loadingTableState: Ref<boolean> = ref(false)

onMounted(() => {
loadingTableState.value = true

});

</script>
<style scoped>

</style>
