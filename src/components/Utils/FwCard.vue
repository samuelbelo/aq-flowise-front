<template>
<v-card>
  <v-card-title>{{title}}</v-card-title>
  <v-card-text>
    <slot name="content"></slot>
  </v-card-text>
  <v-card-actions>
    <slot name="actions"></slot>
  </v-card-actions>
</v-card>
</template>
<script setup lang="ts">
interface ICardProps {
  title?: string;
}

const { title } = defineProps<ICardProps>()
</script>
<style scoped>

</style>
