<template>
  <div>
    <div class="secondaryBarBackground transition-swing pageTitle" elevation="4">
      <v-toolbar-items extended>
        <h1 class="align-self-center pl-6 secondaryTitle">Administration</h1>
        <v-tabs v-model="tab" fixed-tabs background-color="transparent" height="100%">
          <v-tab v-for="(tab) in tabs" :key="tab.tab">
            <h2>{{ tab.text }}</h2>
          </v-tab>
        </v-tabs>
      </v-toolbar-items>
      <v-tabs-items v-model="tab">
        <v-tab-item :value="0">
          <Users/>
        </v-tab-item>
        <v-tab-item :value="1">
          <Profiles/>
        </v-tab-item>
        <v-tab-item :value="2">
          <Organizations/>
        </v-tab-item>
      </v-tabs-items>

    </div>
  </div>
</template>
<script setup lang="ts">
import type {Ref} from "vue";
import {ref} from "vue";
import Users from '@/components/Administration/Users.vue';
import Profiles from '@/components/Administration/Profiles.vue';
import Organizations from '@/components/Administration/Organizations.vue';

const tab: Ref<number | null> = ref(null);
const tabs = ref([
  {
    text: "Users",
    tab: 0,
  },
  {
    text: "Profiles",
    tab: 1,
  },
  {
    text: "Organizations",
    tab: 2,
  },
]);


</script>
<style scoped>
.pageTitle {
  height: 100px;
}

</style>
