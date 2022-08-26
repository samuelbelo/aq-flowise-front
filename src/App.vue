<template>
  <v-app>
    <v-app-bar elevation="1" color="mainBar" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" :disabled="!isAuthenticated"/>
      <v-img class="mr-3" max-width="180px" :src="themeDark ? darkLogo : lightLogo"/>
      <v-toolbar-title>
        <span class="font-weight-bold customTitle">{{ route.name }}</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn icon @click="themeDark = !themeDark">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-progress-linear
        :active="loading"
        :indeterminate="progress === null"
        :value="progress"
        absolute
        bottom
        color="primary accent-3"
      />
    </v-app-bar>

    <v-navigation-drawer
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      class="secondaryBarBackground"
      :value="drawer"
      v-model="drawer"
      expand-on-hover
      :mini-variant.sync="mini"
      app>
      <v-list class="d-flex align-content-center flex-wrap" link>
        <v-list-item :disabled="!isAuthenticated" v-for="(list, i) in pagesList" :key="i" :to="{ path: list.route }">
          <v-list-item-icon>
            <v-icon>{{ list.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ list.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:prepend>
        <v-list-item two-line v-show="isAuthenticated">
          <v-list-item-avatar>
            <img src="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user?.firstName}} {{user?.lastName}}</v-list-item-title>
            <v-list-item-subtitle>Administrator</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:append>
        <v-list>
          <v-list-item to="/administration" :disabled="!isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Administration</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/settings" :disabled="!isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-main>

    <v-overlay v-show="loading" z-index="999">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>

    <v-snackbar
      v-model="snackbar"
      app
      timeout="5000"
      transition="scroll-y-transition"
    >
      {{ snackbarText }}
      <template #action="{ attrs }">
        <v-btn color="primary" icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import {mdiChartAreasplineVariant, mdiChartBar, mdiChartDonut, mdiSpeedometer} from '@mdi/js'
import {
  computed,
  onMounted,
  ref,
  watch,
  type ComputedRef,
  type Ref,
} from 'vue';
import {useRoute, useRouter} from '@logue/vue2-helpers/vue-router';
import {useStore} from '@logue/vue2-helpers/vuex';
import {useVuetify} from '@logue/vue2-helpers/vuetify';
import type {RoutesList} from "@/types/types";
import darkLogo from './assets/DarkLogo.931dfa4d.svg?url';
import lightLogo from './assets/LightLogo.7f2150d0.svg?url'

const store = useStore();
const router = useRouter();
const route = useRoute();
const vuetify = useVuetify();

const pagesList: Ref<RoutesList[]> = ref([
  {
    name: 'Dashboard',
    icon: mdiChartDonut,
    route: '/',
  },
  {
    name: 'Events',
    icon: 'mdi-information-outline',
    route: '/events',
  },
  {
    name: 'Meters',
    icon: mdiSpeedometer,
    route: '/meters',
  },
  {
    name: 'Areas',
    icon: 'mdi-map-outline',
    route: '/areas',
  },
  {
    name: 'Reports',
    icon: mdiChartBar,
    route: '/reports',
  },
  {
    name: 'Water Balance',
    icon: mdiChartAreasplineVariant,
    route: '/water-balance'
  },
]);

const title: Ref<string> = ref(
  import.meta.env.VITE_APP_TITLE || 'Vite APP'
);
const drawer: Ref<boolean> = ref(true);
const mini: Ref<boolean> = ref(true);
const snackbar: Ref<boolean> = ref(false);
const name: Ref<string | null | undefined> = ref(route?.name);

const snackbarText: ComputedRef<string> = computed(() => store.getters.message);
const progress: Ref<number> = computed({
  get: () => store.getters.progress,
  set: v => store.dispatch('setProgress', v),
});
const loading: Ref<boolean> = computed({
  get: () => store.getters.loading,
  set: v => store.dispatch('setLoading', v),
});
const isAuthenticated: Ref<boolean> = computed(() => store.getters['AuthModule/isAuthenticated']);
const themeDark: Ref<boolean> = computed({
  get: () => store.getters['ConfigModule/themeDark'],
  set: v => store.dispatch('ConfigModule/setThemeDark', v),
});
const error: ComputedRef<boolean> = computed(() => store.getters.error);
const user = computed(() => store.getters['AuthModule/user']);


watch(snackbarText, () => (snackbar.value = true));
watch(name, () => (snackbar.value = false));
watch(
  loading,
  () => (document.body.style.cursor = loading.value ? 'wait' : 'auto')
);
watch(error, () => router.push({name: 'Error'}));
watch(themeDark, current => (vuetify.theme.dark = themeDark.value));

onMounted(() => {
  document.title = title.value;
  loading.value = false;
});

</script>

<style lang="scss" scoped>
@import 'node_modules/vuetify/src/styles/styles';

html {
  // Fix always scrollbar shown.
  overflow-y: auto;
  // Modern scrollbar style
  scrollbar-width: thin;
  scrollbar-color: map-get($grey, 'lighten-2') map-get($grey, 'base');
}

::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  background-color: map-get($grey, 'lighten-2');
}

::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: map-get($grey, 'base');
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.secondaryTitle {
  color: #60c5cf;
}

.v-list {
  height: 100% !important;
}

.customTitle {
  background-image: linear-gradient(45deg, #3c7ebd, #172d5f);
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;

}
</style>
