<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="15"
    class="elevation-0"
    :loading="loading"
  ></v-data-table>
</template>
<script setup lang="ts">

defineProps({
  headers: Array,
  desserts: Array,
  loading: Boolean,
})


</script>
<style scoped>

</style>
